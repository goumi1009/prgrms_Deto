import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import color from '@styles/color';

const StyledButton = styled.button`
  width: ${(props) => `${props.size}px`};
  background-color: ${(props) =>
    props.selected ? props.toggleColor : color.border};
`;

const ToggleButton = ({ text, name, size, toggleColor, onToggle }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!selected);
    onToggle({ selected: !selected, name });
  };

  return (
    <StyledButton
      name={name}
      size={size}
      selected={selected}
      toggleColor={toggleColor}
      onClick={handleClick}
    >
      {text}
    </StyledButton>
  );
};

ToggleButton.defaultProps = {
  size: 80,
  toggleColor: color.green,
};

ToggleButton.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  toggleColor: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleButton;
