// import Avatar from '@components/base/Avatar';
// import Text from '@components/base/Text';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import ProfileBox from '@components/base/ProfileBox';

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  /* background-color: ${color.white}; */
`;

const FollowerItem = ({ userProfile, userName }) => (
  <ItemBox>
    <ProfileBox
      src={userProfile}
      size={40}
      content={userName}
      color="primary"
      fontType="small"
    />
  </ItemBox>
);

FollowerItem.propTypes = {
  userProfile: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default FollowerItem;
