import styled from 'styled-components';
import PropTypes from 'prop-types';
import ToggleButton from '@components/base/ToggleButton';
import color from '@styles/color';

const ButtonContainer = styled.div`
  display: flex;
`;

const CategoryButtons = ({ categoryList, onToggle }) => (
  <ButtonContainer>
    {categoryList.map((category) => (
      <ToggleButton
        key={category}
        text={category}
        name={category}
        size={49}
        toggleColor={color.green}
        onToggle={onToggle}
      />
    ))}
  </ButtonContainer>
);
CategoryButtons.propTypes = {
  categoryList: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CategoryButtons;
