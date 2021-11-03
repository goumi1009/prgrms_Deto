import axios from 'axios';
import { TOKEN_KEY, getItem } from '@utils/storage';

const { REACT_APP_API_ENDPOINT, REACT_APP_DY2_CHANNEL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.request.use(
  (config) => config,
  (error) => {
    console.log('에러 발생!', error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('에러 발생!', error);
    return Promise.reject(error);
  },
);

// 로그인 요청 보내기
export const login = async ({ email, password }) => {
  const res = await request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password,
    },
  });
  return res;
};

// 로그아웃
export const logout = async () => {
  await request({
    url: '/logout',
    method: 'post',
  });
};

// 사용자 인증
export const getAuthUser = async (token) => {
  const res = await request({
    url: '/auth-user',
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// 동영 2팀 채널 포스트 목록 받기
export const getPostList = async () => {
  const res = await request({
    url: `/posts/channel/${REACT_APP_DY2_CHANNEL}`,
    method: 'get',
  });
  return res;
};

// 특정 포스트 상세정보 받기
export const getPostDetail = async (postId) => {
  const res = await request({ url: `/posts/${postId}`, method: 'get' });
  return res;
};

// 포스트 작성하기
export const sendPost = async (token, values) => {
  const title = {
    category: values.postCategory,
    techStack: values.postTechStack,
  };
  const meta = {
    title: values.postTitle,
    description: values.postDescription,
    deployLink: values.postDeployLink,
    githubLink: values.postGithubLink,
    collabo: values.postCollabo,
  };

  const formData = new FormData();
  formData.append('title', JSON.stringify(title));
  formData.append('channelId', REACT_APP_DY2_CHANNEL);
  formData.append('image', values.postFile[0]);
  formData.append('meta', JSON.stringify(meta));

  const res = await request({
    url: '/posts/create',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
  return res;
};

// 특정 포스트에 댓글 달기
export const sendComment = async (token, postId, comment) => {
  const res = await request({
    url: `/comments/create`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      comment,
      postId,
    },
  });
  return res;
};

// 특정 포스트에 댓글 삭제하기
export const deleteComment = async (id) => {
  const token = getItem(TOKEN_KEY);
  const res = await request({
    url: `/comments/delete`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id,
    },
  });
  return res;
};

// 특정 포스트 좋아요
export const sendLike = async (token, postId) => {
  const res = await request({
    url: '/likes/create',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      postId,
    },
  });
  return res;
};

// 특정 포스트 좋아요 취소
export const deleteLike = async (token, likeId) => {
  const res = await request({
    url: '/likes/delete',
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: likeId,
    },
  });
  return res;
};

// 회원가입
export const sendSignUp = async ({ email, fullName, username, password }) => {
  const res = await request({
    url: '/signup',
    method: 'post',
    data: {
      email,
      fullName,
      username,
      password,
    },
  });
  return res;
};

// 전체 사용자 목록 가져오기
export const getUserList = async () => {
  const res = await request({
    url: '/users/get-users',
    method: 'get',
  });
  return res;
};

// 특정 사용자 정보 불러오기
export const getUserDetail = async (userId) => {
  const res = await request({
    url: `/users/${userId}`,
    method: 'get',
  });
  return res;
};

// 특정 사용자의 포스트 목록 불러오기
export const getUserPost = async (userId) => {
  const res = await request({
    url: `/posts/author/${userId}`,
    method: 'get',
  });
  return res;
};

// 팔로우 하기
export const follow = async (token, userId) => {
  const res = await request({
    url: '/follow/create',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId,
    },
  });
  return res;
};

// 언팔 하기
export const unfollow = async (token, followingId) => {
  const res = await request({
    url: '/follow/delete',
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: followingId,
    },
  });
  return res;
};

// 알림 목록 조회
export const getNotifications = async (token) => {
  const res = await request({
    url: 'notifications',
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// 알림 생성
export const postNotifications = async (
  token,
  { notificationType, notificationTypeId, userId, postId },
) => {
  const res = await request({
    url: '/notifications/create',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      notificationType,
      notificationTypeId,
      userId,
      postId,
    },
  });
  return res;
};

// 알림 모두 읽음 처리
export const readNotifications = async (token) => {
  const res = await request({
    url: '/notifications/seen',
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
