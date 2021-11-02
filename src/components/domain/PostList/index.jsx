import PropTypes from 'prop-types';

import PostItem from '@components/domain/PostItem';

const PostList = ({ postList }) => (
  <>
    {postList &&
      postList.map((post) => <PostItem key={post.postId} {...post} />)}
  </>
);

PostList.propTypes = {
  postList: PropTypes.array.isRequired,
};

export default PostList;
