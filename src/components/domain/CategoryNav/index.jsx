import { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import TextButton from '@components/base/TextButton';
import color from '@styles/color';

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1120px;
  height: 40px;
  margin: 0 auto;
  background-color: ${color.white};
  border-bottom: 1px solid ${color.border};
`;

const CategoryButton = styled(TextButton)`
  background: none;
  &:hover {
    background: none;

    span {
      color: ${color.greenLight};
    }
  }

  ${({ selected }) =>
    selected &&
    css`
      span {
        position: relative;
        display: inline-block;
        color: ${color.greenLight};
      }
      span::after {
        content: '';
        width: 150%;
        position: absolute;
        display: block;
        left: -25%;
        bottom: -8px;
        border-bottom: 2px solid ${color.greenLight};
      }
    `}
`;

const CategoryNav = ({ onSelect }) => {
  const [selected, setSelected] = useState('전체');
  const categoryList = [
    '전체',
    '재미',
    '라이프',
    '커뮤니티',
    '교육',
    '개발',
    '기타',
  ];

  const handleClick = async (e) => {
    const clickedCategory = e.target.textContent;
    setSelected(clickedCategory);
    onSelect(clickedCategory);
  };

  return (
    <NavContainer>
      {categoryList.map((category) => (
        <CategoryButton
          key={category}
          selected={category === selected}
          textProps={{
            content: category,
            fontType: 'small',
            strong: true,
            color: 'secondary',
          }}
          name={category}
          onClick={handleClick}
        />
      ))}
    </NavContainer>
  );
};

CategoryNav.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default CategoryNav;
