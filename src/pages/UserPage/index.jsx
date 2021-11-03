import { getUserDetail, getUserPost } from '@utils/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import UserInfo from '@components/domain/UserInfo';
import PostList from '@components/domain/PostList';
import PageWrapper from '@components/base/PageWrapper';

const UserPage = () => {
  const { id: userId } = useParams();
  const [userData, setUserData] = useState();
  const [postList, setPostList] = useState();

  const userInfoProp = (user, level) => ({
    image: user.image
      ? user.image
      : 'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
    username: user.username,
    level,
    following: user.following,
    followers: user.followers,
    followingCount: user.following.length,
    followerCount: user.followers.length,
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
        userProfile:
          'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
        username: post.author.username,
        updatedAt: post.updatedAt ? post.updatedAt : post.createdAt,
      };
    });

  useEffect(() => {
    const initData = async () => {
      const postDetail = await getUserPost(userId);
      setPostList(postListProp(postDetail));
      const userDetail = await getUserDetail(userId);
      setUserData(userInfoProp(userDetail, postDetail.length));
    };
    initData();
  }, []);

  return (
    <PageWrapper>
      {userData ? <UserInfo {...userData} /> : undefined}
      {postList ? <PostList postList={postList} /> : undefined}
    </PageWrapper>
  );
};

export default UserPage;
