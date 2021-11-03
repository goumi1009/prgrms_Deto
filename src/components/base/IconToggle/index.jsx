import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const StyledButton = styled.button`
  width: ${(props) => `${props.size}px`};
  filter: ${(props) => (props.selected ? `grayscale(0%)` : `grayscale(100%)`)};
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 50%;

  img {
    width: 80%;
  }
`;

const IconToggle = ({ src, name, size, onToggle }) => {
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
      onClick={handleClick}
    >
      <img src={src} alt={name} />
    </StyledButton>
  );
};

IconToggle.defaultProps = {
  size: 80,
};

IconToggle.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
};

export default IconToggle;
