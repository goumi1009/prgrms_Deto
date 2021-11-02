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
      const titleJson = JSON.parse(res.title);
      const metaJson = JSON.parse(res.meta);
      const lll = {
        postId: res._id,
        userName: res.author.username,
        userProfile: '',
        category: titleJson.category,
        title: metaJson.title,
        description: metaJson.description,
        techStack: titleJson.techstack,
        deployLink: metaJson.deployLink,
        githubLInk: metaJson.githubLInk,
        image: res.image,
        updatedAt: res.updatedAt,
        likes: res.likes,
        likesCount: res.likes.length,
        comments: res.comments,
      };
      setPostData(lll);
    };

    postDetail();
  }, []);

  const loadLikeid = () => {
    const likedIdFilter = userInfo.likes.filter((like) => like.post === id);
    return likedIdFilter[0]._id;
  };

  useEffect(() => {
    setComments(postData.comments);
  }, [postData]);

  useEffect(() => {
    if (userInfo?.likes?.length) {
      setIsLiked(userInfo.likes.some((like) => like.post === id));
      setLikeId(loadLikeid());
    }
  }, [userInfo]);

  // 좋아요 클릭
  const likeClick = () => {
    // state에 따라 좋아요 생성하거나 삭제하기
    if (isLiked) {
      // 좋아요 취소
      deleteLike(userToken, likeId);
      setIsLiked(false);
      setPostData({ ...postData, likesCount: postData.likesCount - 1 });
    } else {
      // 좋아요
      sendLike(userToken, id).then((res) => setLikeId(res._id));
      setIsLiked(true);
      setPostData({ ...postData, likesCount: postData.likesCount + 1 });
    }
  };

  // 댓글 등록
  const handleSubmit = useCallback(
    async (value) => {
      const sendData = JSON.stringify(value);
      const addComment = await sendComment(userToken, id, sendData);
      await setComments([...comments, addComment]);
    },
    [comments],
  );

  // 댓글 삭제
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

  // 댓글 작성자 유무 체크
  const commentAuthorCheck = useCallback(
    (currentComment) => {
      if (userInfo) {
        const isAuthor = userInfo.comments.some(
          (comment) => comment === currentComment,
        );
        return isAuthor;
      }
    },
    [userInfo],
  );

  return (
    <PageStyle>
      <PostInfo postData={postData} onClick={likeClick} isLiked={isLiked} />
      <CommentForm onSubmit={handleSubmit} />
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
