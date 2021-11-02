import Avatar from '@components/base/Avatar';
import Text from '@components/base/Text';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemBox = styled.div`
  display: flex;
  align-items: center;
`;

const FollowerItem = ({ userProfile, userName }) => (
  <ItemBox>
    <Avatar src={userProfile} style={{ margin: '0 20px 0 0' }} />
    <Text content={userName} />
  </ItemBox>
);

FollowerItem.propTypes = {
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default FollowerItem;
