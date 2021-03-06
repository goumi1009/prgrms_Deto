import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import color from '@styles/color';

const StyledButton = styled.button`
  width: ${(props) => `${props.size}px`};
  background-color: ${(props) =>
    props.selected ? props.toggleColor : color.border};
  color: ${(props) => (props.selected ? color.white : color.primary)};
  padding: 4px 8px 5px;
  border-radius: 4px;
  margin-left: 8px;
`;

const FollowingToggle = ({
  name,
  size,
  toggleColor,
  onToggle,
  userId,
  followingId,
}) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!selected);
    onToggle({ selected: !selected, userId, followingId });
  };

  return (
    <StyledButton
      name={name}
      size={size}
      selected={selected}
      toggleColor={toggleColor}
      onClick={handleClick}
      userId={userId}
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
  userId: PropTypes.string.isRequired,
  followingId: PropTypes.string.isRequired,
};

export default FollowingToggle;
