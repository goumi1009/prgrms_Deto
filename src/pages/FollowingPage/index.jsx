import { useAuthContext } from '@contexts/AuthProvider';
import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import { getUserDetail, unfollow, follow } from '@utils/api';
import FollowingItem from '@components/domain/FollowingItem';
import Text from '@components/base/Text';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowingPage = () => {
  const [onlineUser, setOnlineUser] = useState([]);
  const [offlineUser, setOfflineUser] = useState([]);
  const { id } = useParams();
  const { userToken, userInfo } = useAuthContext();
  const { following, userId } = userInfo;

  const handleFollow = async ({ selected, userId, followingId }) => {
    if (selected) {
      await unfollow(userToken, followingId);
    } else {
      await follow(userToken, userId);
    }
  };

  const getFollowingUserList = async (userIds) => {
    const followingUserList = await Promise.all(
      userIds.map(async ({ userId, followingId }) => {
        const userData = await getUserDetail(userId);
        const refine = (user) => ({
          image:
            user?.image ||
            'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
          username: user.username,
          status: user.isOnline,
          userId: user._id,
          followingId,
        });
        return refine(userData);
      }),
    );

    setOnlineUser(followingUserList.filter((user) => user.status === true));
    setOfflineUser(followingUserList.filter((user) => user.status === false));
  };

  useEffect(() => {
    const initFollowingUserList = async () => {
      if (id === userId) {
        const followingIds = following.map(({ _id, user }) => ({
          followingId: _id,
          userId: user,
        }));
        await getFollowingUserList(followingIds);
      } else {
        const userDetail = await getUserDetail(id);
        const { following } = userDetail;
        const followingIds = following.map(({ _id, user }) => ({
          followingId: _id,
          userId: user,
        }));
        await getFollowingUserList(followingIds);
      }
    };
    initFollowingUserList();
  }, [id, userId, following]);

  return (
    <Container>
      <Text content="온라인" fontType="large" />
      {onlineUser.length ? (
        React.Children.toArray(
          onlineUser.map((user) => (
            <FollowingItem
              userProfile={user.image}
              userName={user.username}
              status={user.status}
              onToggle={userId === id ? handleFollow : undefined}
              userId={user.userId}
              followingId={user.followingId}
            />
          )),
        )
      ) : (
        <Text content="유저가 없습니다" />
      )}
      <Text content="오프라인" fontType="large" />
      {offlineUser.length ? (
        React.Children.toArray(
          offlineUser.map((user) => (
            <FollowingItem
              userProfile={user.image}
              userName={user.username}
              status={user.status}
              onToggle={userId === id ? handleFollow : undefined}
              userId={user.userId}
              followingId={user.followingId}
            />
          )),
        )
      ) : (
        <Text content="유저가 없습니다" />
      )}
    </Container>
  );
};

export default FollowingPage;
