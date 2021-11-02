import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileBox from '@components/base/ProfileBox';
import Text from '@components/base/Text';
import TextButton from '@components/base/TextButton/index';
import color from '@styles/color';
import { useAuthContext } from '@contexts/AuthProvider';

const UserInfoWrapper = styled.div`
  max-width: 400px;
  position: relative;
  > button {
    display: block;
    margin-left: auto;
  }
`;

const LinkButtonWrapper = styled.div`
  display: block;
  padding-left: 72px;
`;

const LinkButton = styled.button``;

const CountText = styled.span`
  display: block;
  color: ${color.secondary};
`;

const UserInfo = ({
  username,
  level,
  image,
  followers,
  userId,
  followerCount,
  followingCount,
}) => {
  const { userInfo } = useAuthContext();
  const getButtonText = () => {
    let text = '';
    if (userId === userInfo.userId) {
      text = 'Edit';
    } else if (followers.includes(userInfo.userId)) {
      text = 'Following';
    } else {
      text = 'Follow';
    }
    return text;
  };

  const textProps = {
    content: getButtonText(),
    color: color.white,
  };

  return (
    <UserInfoWrapper>
      <TextButton
        textProps={textProps}
        name="userInfoButton"
        onClick={() => console.log('회원정보수정 페이지로 이동')}
      />
      <ProfileBox
        src={image}
        size={72}
        content={`${username} ㆍ lv.${level}`}
        fontType="base"
        color={color.primary}
        strong
      />
      <LinkButtonWrapper>
        <Link to={`/user/${userId}/follower`}>
          <LinkButton>
            <CountText>{followerCount}</CountText>
            <Text content="팔로워" strong />
          </LinkButton>
        </Link>
        <Link to={`/user/${userId}/following`}>
          <LinkButton>
            <CountText>{followingCount}</CountText>
            <Text content="팔로잉" strong />
          </LinkButton>
        </Link>
      </LinkButtonWrapper>
    </UserInfoWrapper>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  followers: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  followerCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
};

export default UserInfo;
