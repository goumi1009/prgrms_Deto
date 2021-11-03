import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications, readNotifications } from '@utils/api';
import { useAuthContext } from '@contexts/AuthProvider';
import styled from 'styled-components';
import color from '@styles/color';
import Icon from '@components/base/Icon';
import Text from '../../base/Text/index';

const ReadButton = styled.button`
  display: block;
  margin-left: auto;
  margin-bottom: 16px;
  background-color: ${color.tertiary};
  padding: 8px 16px;
  color: ${color.white};
  border-radius: 4px;
`;

const NotificationItem = styled.div`
  width: 100%;
  margin-bottom: 16px;
  opacity: ${(props) => (props.isSeen ? 0.7 : 1)};

  &:hover {
    opacity: 1;
  }
`;

const ItemLink = styled(Link)`
  display: flex;
  border-radius: 8px;
  background-color: ${color.white};
  padding: 12px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

  i {
    margin-right: 8px;
  }
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
            <ItemLink to={postId ? `/post/${postId}` : `/user/${userId}`}>
              <Icon name="bell" color={color.secondary} />
              <Text content={message} />
            </ItemLink>
          </NotificationItem>
        ),
      )}
    </>
  );
};

export default NotificationForm;
