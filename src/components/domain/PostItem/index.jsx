import styled from 'styled-components';
import PropTypes from 'prop-types';
import Image from '@components/base/Image';
import Text from '@components/base/Text';
import ProfileBox from '@components/base/ProfileBox';
import Avatar from '@components/base/Avatar';
import { Link } from 'react-router-dom';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const PostUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StackContainer = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0.7;
`;

const StackWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 5px;
`;

const ThunmbnailWrapper = styled.div`
  position: relative;
`;

const CategoryWrapper = styled.div`
  border: 1px solid #bcbcbc;
  border-radius: 15px;
  padding: 3px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CategoryLikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PostItem = ({
  postId,
  userId,
  category,
  image,
  techStack,
  likes,
  title,
  description,
  userProfile,
  username,
  updatedAt,
  ...props
}) => {
  const categories =
    category.length >= 2
      ? `${category[0]} 외 ${category.length - 1}개`
      : category[0];
  const likeIcon = 'https://picsum.photos/200'; // likeIcon 들어갈 자리

  return (
    <PostContainer {...props}>
      <Link to={`/userPage/${userId}`}>
        <PostUser>
          <ProfileBox src={userProfile} content={username} />
          <Text content={updatedAt} />
        </PostUser>
      </Link>
      <Link to={`/post/${postId}`}>
        <ThunmbnailWrapper>
          <StackWrapper>
            <StackContainer>
              {techStack.map((tech) => (
                <Text content={tech} />
              ))}
            </StackContainer>
          </StackWrapper>
          <Image src={image} width="600px" height="300px" />
        </ThunmbnailWrapper>
        <TextContainer>
          <Text content={title} fontType="large" />
          <Text content={description} />
        </TextContainer>
        <CategoryLikeWrapper>
          <CategoryWrapper>{categories}</CategoryWrapper>
          <LikeWrapper>
            <Avatar src={likeIcon} width="30px" />
            <Text content={likes} />
          </LikeWrapper>
        </CategoryLikeWrapper>
      </Link>
    </PostContainer>
  );
};

PostItem.defaultProps = {
  userProfile: 'https://picsum.photos/200/400',
};

PostItem.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  techStack: PropTypes.array.isRequired,
  likes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userProfile: PropTypes.string,
  username: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default PostItem;
