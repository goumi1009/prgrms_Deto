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

  const [onLineFollowerDetail, setOnLineFollowerDetail] = useState([]);
  const [offLineFollowerDetail, setOffLineFollowerDetail] = useState([]);

  useEffect(() => {
    const callUserDetail = async () => {
      const userDetail = await getUserDetail(id);
      const { followers } = userDetail;
      const followerUserId = followers.map((userr) => userr.follower);

      const callFollowerUserDetail = async () => {
        const detailList = await Promise.all(
          followerUserId.map(async (userId) => {
            const userData = await getUserDetail(userId);

            const refine = (user) => ({
              image: user.image ? user.image : 'https://picsum.photos/200/400',
              username: user.username,
              status: user.isOnline,
              userId: user._id,
            });

            return refine(userData);
          }),
        );
        setOnLineFollowerDetail(
          detailList.filter((user) => user.status === true),
        );
        setOffLineFollowerDetail(
          detailList.filter((user) => user.status === false),
        );
      };
      callFollowerUserDetail();
    };
    callUserDetail();
  }, []);

  return (
    <Container>
      <Text content="온라인" fontType="large" />
      {onLineFollowerDetail.length !== 0 ? (
        onLineFollowerDetail.map((user) => (
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
      {offLineFollowerDetail.length !== 0 ? (
        offLineFollowerDetail.map((user) => (
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
