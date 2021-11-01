import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextButton from '@components/base/TextButton';
import color from '@styles/color';

const NavContainer = styled.div`
  display: flex;
  width: 264px;
  height: 40px;
  background-color: ${color.white};
`;

// eslint-disable-next-line no-unused-vars
const CategoryNav = ({ onSelect }) => {
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
    onSelect(clickedCategory);
  };

  return (
    <NavContainer>
      {categoryList.map((category) => (
        <TextButton
          key={category}
          textProps={{
            content: category,
            fontType: 'micro',
            color: 'secondary',
          }}
          name={category}
          size={42}
          color={color.white}
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
