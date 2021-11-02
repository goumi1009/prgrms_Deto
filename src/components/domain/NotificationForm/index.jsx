import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications, readNotifications } from '@utils/api';
import { useAuthContext } from '@contexts/AuthProvider';
import styled from 'styled-components';
import color from '@styles/color';

const ReadButton = styled.button`
  width: 200px;
  background-color: ${color.green};
`;

const NotificationItem = styled.div`
  width: 100%;
  border: 1px solid black;
  background-color: ${(props) =>
    props.isSeen ? `${color.white}` : `${color.border}`};
`;

const NotificationForm = () => {
  const [notifications, setNotifications] = useState([]);
  const { userToken } = useAuthContext();

  useEffect(() => {
    const initNotifications = async () => {
      const fetchedNotifications = await getNotifications(userToken);
      setNotifications(
        fetchedNotifications.map((notification) => {
          const { _id, username } = notification.user;
          const message =
            (notification.like && '좋아요를 눌렀습니다') ||
            (notification.comment && '댓글을 남겼습니다') ||
            (notification.follow && '팔로우를 했습니다');
          return {
            notificationId: notification._id,
            postId: notification.post,
            message: `${username}님이 ${message}`,
            userId: _id,
            isSeen: notification.seen,
          };
        }),
      );
    };
    initNotifications();
  }, []);

  const handleReadAll = async () => {
    await readNotifications(userToken);
    notifications.forEach(({ isSeen }) => {
      if (!isSeen) {
        isSeen = true;
      }
    });

    const fetchedNotifications = await getNotifications(userToken);
    setNotifications(
      fetchedNotifications.map((notification) => {
        const { _id, username } = notification.user;
        const message =
          (notification.like && '좋아요를 눌렀습니다') ||
          (notification.comment && '댓글을 남겼습니다') ||
          (notification.follow && '팔로우를 했습니다');
        return {
          notificationId: notification._id,
          postId: notification.post,
          message: `${username}님이 ${message}`,
          userId: _id,
          isSeen: notification.seen,
        };
      }),
    );
  };

  return (
    <>
      <ReadButton onClick={handleReadAll}>모두 읽음 처리</ReadButton>
      {notifications.map(
        ({ notificationId, postId, message, userId, isSeen }) => (
          <NotificationItem key={notificationId} isSeen={isSeen}>
            <Link to={postId ? `/post/${postId}` : `/user/${userId}`}>
              {message}
            </Link>
          </NotificationItem>
        ),
      )}
    </>
  );
};

export default NotificationForm;
