import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfileBox from '@components/base/ProfileBox';
import Text from '@components/base/Text';
import TextButton from '@components/base/TextButton/index';
import color from '@styles/color';

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
  following,
  userId,
  followerCount,
  followingCount,
}) => {
  const nowUserId = '123';
  let text = '';

  if (userId === nowUserId) {
    text = 'Edit';
  } else if (followers.includes(nowUserId)) {
    text = 'Following';
  } else {
    text = 'Follow';
  }

  const textProps = {
    content: text,
    color: color.white,
  };

  return (
    <UserInfoWrapper>
      <TextButton textProps={textProps} />
      <ProfileBox
        src={image}
        size={72}
        content={`${username} ㆍ lv.${level}`}
        fontType="base"
        color={color.primary}
        strong
      />
      <LinkButtonWrapper>
        <LinkButton to={followers}>
          <CountText>{followerCount}</CountText>
          <Text content="팔로워" strong />
        </LinkButton>
        <LinkButton to={following}>
          <CountText>{followingCount}</CountText>
          <Text content="팔로잉" strong />
        </LinkButton>
      </LinkButtonWrapper>
    </UserInfoWrapper>
  );
};

UserInfo.defaultProps = {
  image: 'https://picsum.photos/200/400',
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  image: PropTypes.string,
  followers: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  followerCount: PropTypes.isRequired,
  followingCount: PropTypes.isRequired,
};

export default UserInfo;
