import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import color from '@styles/color';
import ToggleButton from '@components/base/ToggleButton';

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 4px 0 16px;
  border-radius: 4px;
  border: 1px solid ${color.greenLight};
  overflow: hidden;
`;

const CategoryButtons = ({ categoryList, onToggle }) => (
  <ButtonContainer>
    {React.Children.toArray(
      categoryList.map((category) => (
        <ToggleButton
          key={category}
          text={category}
          name={category}
          fontColor={color.greenLight}
          baseColor={color.white}
          toggleColor={color.greenLight}
          onToggle={onToggle}
        />
      )),
    )}
  </ButtonContainer>
);
CategoryButtons.propTypes = {
  categoryList: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CategoryButtons;
