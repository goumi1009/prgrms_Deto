import { useAuthContext } from '@contexts/AuthProvider';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUserDetail, unfollow, follow } from '@utils/api';
import FollowingItem from '@components/domain/FollowingItem';
import Text from '@components/base/Text';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FollowingPage = () => {
  const { id } = useParams();
  const { userInfo } = useAuthContext();

  const { following, userId } = userInfo;

  const [onLineFollowingDetail, setOnLineFollowingDetail] = useState([]);
  const [offLineFollowingDetail, setOffLineFollowingDetail] = useState([]);

  const handleFollow = ({ selected, selectedUserId }) => {
    // 삭제 API요청
    if (selected) {
      const callDeleteApi = async () => {
        const callUserDetail = async () => {
          const userDetail = await getUserDetail(id);
          const { following } = userDetail;

          const filterUser = following.filter(
            (obj) => obj.user === selectedUserId,
          );
          if (filterUser) {
            const { _id } = filterUser[0];
            await unfollow(_id);
          }
        };
        callUserDetail();
      };
      callDeleteApi();
    } else {
      // 팔로우 API요청
      const callApplyApi = async () => {
        const callUserDetail = async () => {
          const userDetail = await getUserDetail(id);
          const { following } = userDetail;
          const filterUser = following.filter(
            (obj) => obj.user === selectedUserId,
          );
          if (filterUser.length === 0) {
            await follow(selectedUserId);
          }
        };
        callUserDetail();
      };
      callApplyApi();
    }
  };

  useEffect(() => {
    if (id === userId && following) {
      const followingUserId = following.map((userr) => userr.user);

      const callFollowingUserDetail = async () => {
        const detailList = await Promise.all(
          followingUserId.map(async (userId) => {
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

        setOnLineFollowingDetail(
          detailList.filter((user) => user.status === true),
        );
        setOffLineFollowingDetail(
          detailList.filter((user) => user.status === false),
        );
      };
      callFollowingUserDetail();
    } else {
      const callUserDetail = async () => {
        const userDetail = await getUserDetail(id); // 1-1. 유저의 팔로잉 목록 뽑아오기 위해 요청
        const { following } = userDetail;
        const followingUserId = following.map((userr) => userr.user);

        const callFollowingUserDetail = async () => {
          const detailList = await Promise.all(
            followingUserId.map(async (userId) => {
              const userData = await getUserDetail(userId);

              const refine = (user) => ({
                image: user.image
                  ? user.image
                  : 'https://picsum.photos/200/400',
                username: user.username,
                status: user.isOnline,
                userId: user._id,
              });

              return refine(userData);
            }),
          );

          setOnLineFollowingDetail(
            detailList.filter((user) => user.status === true),
          );
          setOffLineFollowingDetail(
            detailList.filter((user) => user.status === false),
          );
        };
        callFollowingUserDetail();
      };
      callUserDetail();
    }
  }, [following]);

  return (
    <Container>
      <Text content="온라인" fontType="large" />
      {onLineFollowingDetail.length !== 0 ? (
        onLineFollowingDetail.map((user) => (
          <FollowingItem
            userProfile={user.image}
            userName={user.username}
            status={user.status}
            key={user.userId}
            onToggle={userId === id ? handleFollow : undefined}
            userId={user.userId}
          />
        ))
      ) : (
        <Text content="유저가 없습니다" />
      )}
      <Text content="오프라인" fontType="large" />
      {offLineFollowingDetail.length !== 0 ? (
        offLineFollowingDetail.map((user) => (
          <FollowingItem
            userProfile={user.image}
            userName={user.username}
            status={user.status}
            key={user.userId}
            onToggle={userId === id ? handleFollow : undefined}
            userId={user.userId}
          />
        ))
      ) : (
        <Text content="유저가 없습니다" />
      )}
    </Container>
  );
};

export default FollowingPage;
