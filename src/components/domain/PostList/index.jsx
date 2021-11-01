import PropTypes from 'prop-types';

import PostItem from '@components/domain/PostItem';

const PostList = ({ postDetails }) => (
  <>{postDetails && postDetails.map((post) => <PostItem {...post} />)}</>
);

PostList.propTypes = {
  postDetails: PropTypes.object.isRequired,
};

export default PostList;
