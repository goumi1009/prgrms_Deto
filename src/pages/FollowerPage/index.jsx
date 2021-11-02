import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUserDetail } from '@utils/api';
import FollowerItem from '@components/domain/FollowerItem';
import Text from '@components/base/Text';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowerPage = () => {
  const { id } = useParams();

  const [onlineUser, setOnlineUser] = useState([]);
  const [offlineUser, setOfflineUser] = useState([]);

  useEffect(() => {
    const getFollowerUserList = async () => {
      const { followers } = await getUserDetail(id);
      const followerIds = followers.map(({ follower }) => follower);

      const detailList = await Promise.all(
        followerIds.map(async (userId) => {
          const userData = await getUserDetail(userId);

          const refine = (user) => ({
            image:
              user?.image ||
              'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
            username: user.username,
            status: user.isOnline,
            userId: user._id,
          });

          return refine(userData);
        }),
      );
      setOnlineUser(detailList.filter((user) => user.status === true));
      setOfflineUser(detailList.filter((user) => user.status === false));
    };
    getFollowerUserList();
  }, [id]);

  return (
    <Container>
      <Text content="온라인" fontType="large" />
      {onlineUser.length !== 0 ? (
        onlineUser.map((user) => (
          <FollowerItem
            userProfile={user.image}
            userName={user.username}
            key={user.userId}
          />
        ))
      ) : (
        <Text content="유저가 없습니다" />
      )}
      <Text content="오프라인" fontType="large" />
      {offlineUser.length !== 0 ? (
        offlineUser.map((user) => (
          <FollowerItem
            userProfile={user.image}
            userName={user.username}
            key={user.userId}
          />
        ))
      ) : (
        <Text content="유저가 없습니다" />
      )}
    </Container>
  );
};

export default FollowerPage;
