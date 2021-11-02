import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import color from '@styles/color';
import fontType from '@styles/fontType';
import Image from '@components/base/Image';
import Text from '@components/base/Text';
import ProfileBox from '@components/base/ProfileBox';
import Icon from '@components/base/Icon';

const PostContainer = styled.div`
  max-width: 500px;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto 16px;
`;

const PostUserLink = styled(Link)`
  display: flex;
  align-items: center;
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
  overflow: hidden;
  border-radius: 4px;
  height: 270px;
  margin: 8px 0 16px;
`;

const CategoryWrapper = styled.div`
  padding: 3px;
  ${fontType.micro};
  border-radius: 15px;
  background: ${color.border};
  font-weight: bold;
  padding: 4px 12px;
  color: ${color.secondary};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 8px;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  i {
    margin-right: 4px;
  }
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
    (category || []).length >= 2
      ? `${category[0]} 외 ${category.length - 1}개`
      : category[0];

  return (
    <PostContainer {...props}>
      <PostUserLink to={`/user/${userId}`}>
        <ProfileBox
          size={32}
          src={userProfile}
          content={username}
          fontType="small"
          color="primary"
        />
        <Text
          content={updatedAt.split('T')[0]}
          fontType="micro"
          color="secondary"
        />
      </PostUserLink>
      <Link to={`/post/${postId}`}>
        <ThunmbnailWrapper>
          <StackWrapper>
            <StackContainer>
              {techStack.map((tech) => (
                <Text key={tech} content={tech} />
              ))}
            </StackContainer>
          </StackWrapper>
          <Image src={image} width="100%" height="100%" />
        </ThunmbnailWrapper>
        <TextContainer>
          <Text content={title} fontType="base" strong />
          <Text content={description} fontType="small" color="secondary" />
        </TextContainer>
        <CategoryLikeWrapper>
          <CategoryWrapper>{categories}</CategoryWrapper>
          <LikeWrapper>
            <Icon name="thumbs-up" size={20} color={color.secondary} />
            <Text content={likes} color="secondary" fontType="small" />
          </LikeWrapper>
        </CategoryLikeWrapper>
      </Link>
    </PostContainer>
  );
};

// PostItem.defaultProps = {
//   userProfile: 'https://picsum.photos/200/400',
// };

PostItem.defaultProps = {
  userProfile: '',
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
