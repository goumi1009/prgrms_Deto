import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import ProfileBox from '@components/base/ProfileBox';
import Text from '@components/base/Text';
import TextButton from '@components/base/TextButton/index';
import color from '@styles/color';
import { useAuthContext } from '@contexts/AuthProvider';
import { follow, unfollow, postNotifications } from '@utils/api';

const UserInfoWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${color.border};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
`;

const DivWrap = styled.div`
  button {
    display: block;
    margin-top: 16px;
  }
`;

const LinkButtonWrapper = styled.div`
  display: flex;
`;

const LinkButton = styled(Link)`
  display: block;
  text-align: center;
  &:not(:first-child) {
    margin-left: 16px;
  }
`;

const CountText = styled.span`
  display: block;
  color: ${color.secondary};
`;

const UserInfo = ({
  username,
  level,
  image,
  followerCount,
  followingCount,
  userId,
}) => {
  const [buttonStatus, setButtonStatus] = useState('');
  const { userToken, userInfo, updateUserInfo } = useAuthContext();
  const [followerDisplay, setFollowerDisplay] = useState(followerCount);
  const history = useHistory();

  const textProps = {
    content: buttonStatus,
    color: color.white,
  };

  useEffect(() => {
    if (userId === userInfo.userId) {
      setButtonStatus('회원정보수정');
    } else if (userInfo.following.some(({ user }) => user === userId)) {
      setButtonStatus('팔로잉');
    } else {
      setButtonStatus('팔로우');
    }
  }, [userInfo]);

  const handleClick = async () => {
    if (buttonStatus === '회원정보수정') {
      history.push('/user/edit');
      return;
    }
    if (buttonStatus === '팔로잉') {
      const { _id } = userInfo.following.find(({ user }) => user === userId);
      await unfollow(userToken, _id);
      setButtonStatus('팔로우');
      setFollowerDisplay(followerDisplay - 1);
    } else {
      const { _id, user } = await follow(userToken, userId);
      await postNotifications(userToken, {
        notificationType: 'FOLLOW',
        notificationTypeId: _id,
        userId: user,
        postId: null,
      });
      setButtonStatus('팔로잉');
      setFollowerDisplay(followerDisplay + 1);
    }
    await updateUserInfo();
  };

  return (
    <UserInfoWrapper>
      <DivWrap>
        <ProfileBox
          src={image}
          size={72}
          content={`${username} ㆍ lv.${level}`}
          fontType="base"
          color={color.primary}
          strong
        />
        <TextButton
          textProps={textProps}
          name="userInfoButton"
          onClick={handleClick}
        />
      </DivWrap>
      <LinkButtonWrapper>
        <LinkButton to={`/user/${userId}/follower`}>
          <CountText>{followerDisplay}</CountText>
          <Text content="팔로워" />
        </LinkButton>
        <LinkButton to={`/user/${userId}/following`}>
          <CountText>{followingCount}</CountText>
          <Text content="팔로잉" />
        </LinkButton>
      </LinkButtonWrapper>
    </UserInfoWrapper>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  followerCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
};

export default UserInfo;
