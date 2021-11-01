import CategoryNav from '@components/domain/CategoryNav';
import { useState, useEffect } from 'react';
import { getPostList } from '@utils/api';

const MainPage = () => {
  const [postList, setPostList] = useState();
  console.log('PostList 컴포넌트에 내려줄 state', postList);

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
        // 유저 프로필 임시
        userProfile: 'https://via.placeholder.com/48x48.png?text=Profile',
        userName: post.author.username,
        updatedAt: post.updatedAt,
      };
    });

  useEffect(() => {
    const initPostList = async () => {
      const defaultPostList = await getPostList();
      setPostList(defaultPostList);
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

  return <CategoryNav onSelect={handleCategory} />;
};

export default MainPage;
