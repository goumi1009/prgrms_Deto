import Avatar from '@components/base/Avatar';
import Text from '@components/base/Text';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Badge from '@components/base/Badge';
import FollowingToggle from '@components/base/FollowingToggle';
import color from '@styles/color';

const ItemBox = styled.div`
  display: flex;
  align-items: center;
`;

const FollowingItem = ({ userProfile, userName, status, onToggle, userId }) => {
  const avatar = <Avatar src={userProfile} />;

  return (
    <ItemBox>
      <Badge userStatus={status}>{avatar}</Badge>
      <Text content={userName} />
      {onToggle ? (
        <FollowingToggle
          name={userId}
          size={49}
          toggleColor={color.green}
          onToggle={onToggle}
          selectedUserId={userId}
        />
      ) : undefined}
    </ItemBox>
  );
};

FollowingItem.defaultProps = {
  onToggle: '',
};

FollowingItem.propTypes = {
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

export default FollowingItem;
