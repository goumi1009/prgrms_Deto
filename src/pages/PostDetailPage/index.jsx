import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import {
  getPostDetail,
  sendComment,
  deleteComment,
  sendLike,
  deleteLike,
} from '@utils/api';
import { useAuthContext } from '@contexts/AuthProvider';
import CommentForm from '@components/domain/CommentForm';
import CommentItem from '@components/domain/CommentItem';
import PostInfo from '@components/domain/PostInfo';

const PageStyle = styled.div`
  max-width: 1120px;
  padding: 40px 20px;
  margin: 0 auto;
`;

const CommentList = styled.ul`
  li {
    margin-bottom: 16px;
  }
`;

const PostDetailPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState('');
  const { userToken, userInfo } = useAuthContext();

  useEffect(() => {
    const postDetail = async () => {
      const res = await getPostDetail(id);
      const { category, techStack } = JSON.parse(res.title);
      const { title, description, deployLink, githubLink } = JSON.parse(
        res.meta,
      );
      const filteredPostData = {
        postId: res._id,
        userName: res.author.username,
        userProfile:
          'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
        category,
        title,
        description,
        techStack,
        deployLink,
        githubLink,
        image: res.image,
        updatedAt: res.updatedAt.split('T')[0],
        likes: res.likes,
        likesCount: res.likes.length,
        comments: res.comments,
        userId: res.author._id,
      };
      setPostData(filteredPostData);
    };

    postDetail();
  }, []);

  const loadLikeId = () => {
    const likedIdFilter = userInfo.likes.filter((like) => like.post === id);
    return likedIdFilter.length ? likedIdFilter[0]._id : [];
  };

  useEffect(() => {
    setComments(postData.comments);
  }, [postData]);

  useEffect(() => {
    if (userInfo?.likes?.length) {
      setIsLiked(userInfo.likes.some((like) => like.post === id));
      setLikeId(loadLikeId());
    }
  }, [userInfo]);

  const likeClick = () => {
    if (isLiked) {
      deleteLike(userToken, likeId);
      setIsLiked(false);
      setPostData({ ...postData, likesCount: postData.likesCount - 1 });
    } else {
      sendLike(userToken, id).then((res) => setLikeId(res._id));
      setIsLiked(true);
      setPostData({ ...postData, likesCount: postData.likesCount + 1 });
    }
  };

  const handleCommentSubmit = useCallback(
    async (value) => {
      const sendData = JSON.stringify(value);
      const addComment = await sendComment(userToken, id, sendData);
      await setComments([...comments, addComment]);
    },
    [comments],
  );

  const handleCommentDelete = useCallback(
    async (commentId) => {
      const delComment = await deleteComment(commentId);
      const filterComment = await comments.filter(
        (comment) => comment._id !== delComment._id,
      );
      await setComments(filterComment);
    },
    [comments],
  );

  const commentAuthorCheck = useCallback(
    (currentComment) => {
      if (userInfo) {
        const isAuthor =
          userInfo.comments &&
          userInfo.comments.some((comment) => comment === currentComment);
        return isAuthor;
      }
    },
    [userInfo],
  );

  return (
    <PageStyle>
      <PostInfo postData={postData} onClick={likeClick} isLiked={isLiked} />
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList>
        {(comments || []).map((comment) => {
          const { type, text } = JSON.parse(comment.comment);
          return (
            <CommentItem
              commentId={comment._id}
              for={comment._id}
              commentType={type}
              commentText={text}
              authorUsername={comment.author.username}
              isAuthor={commentAuthorCheck(comment._id)}
              onDelete={handleCommentDelete}
            />
          );
        })}
      </CommentList>
    </PageStyle>
  );
};

export default PostDetailPage;
