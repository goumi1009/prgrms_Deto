import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import color from '@styles/color';

const StyledButton = styled.button`
  flex: 1;
  padding: 8px;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  color: ${({ fontColor }) => fontColor};
  background: ${({ baseColor }) => baseColor};
  &:not(:first-child) {
    border-left: 1px solid ${color.greenLight};
  }
  ${({ selected }) =>
    selected &&
    css`
      background: ${({ toggleColor }) => toggleColor};
      color: ${color.white};
    `};

  ${({ selected, name }) =>
    selected &&
    name === 'collaboButton' &&
    css`
      ::before {
        content: '✔';
        display: block;
        margin-right: 4px;
      }
    `};
`;

const ToggleButton = ({
  text,
  name,
  size,
  fontColor,
  baseColor,
  toggleColor,
  onToggle,
  ...props
}) => {
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
      fontColor={fontColor}
      baseColor={baseColor}
      toggleColor={toggleColor}
      onClick={handleClick}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

ToggleButton.defaultProps = {
  size: 'auto',
  toggleColor: color.green,
  baseColor: color.tertiary,
  fontColor: color.white,
};

ToggleButton.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggleColor: PropTypes.string,
  baseColor: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  fontColor: PropTypes.string,
};

export default ToggleButton;
