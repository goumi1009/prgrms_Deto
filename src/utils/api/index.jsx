import axios from 'axios';

const {
  REACT_APP_API_ENDPOINT,
  REACT_APP_DY2_CHANNEL,
  REACT_APP_TEST_TOKEN,
} = process.env;

const request = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
  timeout: 3000,
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
  try {
    await request({
      url: '/logout',
      method: 'post',
    });
  } catch (error) {
    console.log(error);
  }
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
export const sendPost = async (values) => {
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
      Authorization: `Bearer ${REACT_APP_TEST_TOKEN}`,
    },
    data: formData,
  });
  return res;
};

// 특정 포스트에 댓글 작성하기
export const sendComment = async (postId, comment) => {
  const res = await request({
    url: `/comments/create`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${REACT_APP_TEST_TOKEN}`,
    },
    data: {
      postId,
      comment,
    },
  });
  return res;
};
