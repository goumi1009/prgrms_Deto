/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { getUserDetail, getUserPost } from '@utils/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import UserInfo from '@components/domain/UserInfo';
import PostList from '@components/domain/PostList';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState();

  const userInfoProp = (user, level) => ({
    image: user.image ? user.image : 'https://picsum.photos/200/400',
    username: user.username,
    level,
    followerCount: user.followers.length,
    followingCount: user.following.length,
    followers: `following/${user._id}`,
    following: `follower/${user._id}`,
    userId: user._id,
  });

  const postListProp = (postList) =>
    postList.map((post) => {
      const title = JSON.parse(post.title);
      const meta = JSON.parse(post.meta);
      return {
        postId: post._id,
        userId: post.author._id,
        category: title.category,
        image: post.image,
        techStack: title.techStack,
        likes: post.likes.length,
        title: meta.title,
        description: meta.description,
        userProfile: 'https://via.placeholder.com/48x48.png?text=Profile',
        username: post.author.username,
        updatedAt: post.updatedAt ? post.updatedAt : post.createdAt,
      };
    });

  useEffect(async () => {
    const postDetail = await getUserPost(userId);
    setPostData(postListProp(postDetail));
    const userDetail = await getUserDetail(userId);
    setUserData(userInfoProp(userDetail, postDetail.length));
  }, []);

  return (
    <PageContainer>
      {userData ? <UserInfo {...userData} /> : undefined}
      {postData ? <PostList postDetails={postData} /> : undefined}
    </PageContainer>
  );
};

export default UserPage;
