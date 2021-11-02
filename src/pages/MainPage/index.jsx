import CategoryNav from '@components/domain/CategoryNav';
import PageWrapper from '@components/base/PageWrapper';
import PostList from '@components/domain/PostList';
import { useState, useEffect } from 'react';
import { getPostList } from '@utils/api';

const MainPage = () => {
  const [postList, setPostList] = useState();

  const formatPost = (postList) =>
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
        updatedAt: post.updatedAt,
      };
    });

  useEffect(() => {
    const initPostList = async () => {
      const defaultPostList = await getPostList();
      setPostList(formatPost(defaultPostList));
    };

    initPostList();
  }, []);

  const handleCategory = async (category) => {
    const totalPostList = await getPostList();
    const filteredPostList = formatPost(totalPostList);

    if (category === '전체') {
      setPostList(filteredPostList);
    } else {
      setPostList(
        filteredPostList.filter((post) => post.category.includes(category)),
      );
    }
  };

  return (
    <>
      <CategoryNav onSelect={handleCategory} />
      <PageWrapper>
        {postList ? <PostList postList={postList} /> : undefined}
      </PageWrapper>
    </>
  );
};

export default MainPage;
