import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import color from '@styles/color';

const StyledButton = styled.button`
  width: ${(props) => `${props.size}px`};
  background-color: ${(props) =>
    props.selected ? props.toggleColor : color.border};
`;

const FollowingToggle = ({ name, size, toggleColor, onToggle, identify }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!selected);
    onToggle({ selected: !selected, identify });
  };
  console.log('identify받아오나?', identify);

  return (
    <StyledButton
      name={name}
      size={size}
      selected={selected}
      toggleColor={toggleColor}
      onClick={handleClick}
    >
      {selected ? '팔로우' : '팔로잉'}
    </StyledButton>
  );
};

FollowingToggle.defaultProps = {
  size: 80,
  toggleColor: color.green,
};

FollowingToggle.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  toggleColor: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  identify: PropTypes.string.isRequired,
};

export default FollowingToggle;
