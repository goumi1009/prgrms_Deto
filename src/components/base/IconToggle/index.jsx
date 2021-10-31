import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Avatar from '@components/base/Avatar';

const StyledButton = styled.button`
  width: ${(props) => `${props.size}px`};
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  margin: 10px;
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
      <Avatar src={src} size={size} />
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
