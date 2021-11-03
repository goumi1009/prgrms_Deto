import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import color from '@styles/color';
import fontType from '@styles/fontType';
import Image from '@components/base/Image';
import Text from '@components/base/Text';
import ProfileBox from '@components/base/ProfileBox';
import Icon from '@components/base/Icon';
import Avatar from '@components/base/Avatar';
// import java from '@assets/icon/java.svg';
// import javascript from '@assets/icon/javascript.svg';
// import nodedotjs from '@assets/icon/nodedotjs.svg';
// import python from '@assets/icon/python.svg';
// import react from '@assets/icon/react.svg';
// import typescript from '@assets/icon/typescript.svg';
// import vuedotjs from '@assets/icon/vuedotjs.svg';

// const iconList = [
//   { src: java, name: 'Java' },
//   { src: javascript, name: 'JavaScript' },
//   { src: nodedotjs, name: 'Node.js' },
//   { src: python, name: 'Python' },
//   { src: typescript, name: 'TypeScript' },
//   { src: react, name: 'react' },
//   { src: vuedotjs, name: 'Vue' },
// ];

const PostContainer = styled.div`
  max-width: 500px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto 40px;
  background: ${color.white};
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
  padding: 4px 12px;
  color: ${color.secondary};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
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
          fontType="base"
          color="primary"
        />
        <Text
          content={updatedAt.split('T')[0]}
          fontType="small"
          color="secondary"
        />
      </PostUserLink>
      <Link to={`/post/${postId}`}>
        <ThunmbnailWrapper>
          <StackWrapper>
            <StackContainer>
              {techStack.map((tech) => (
                <Avatar key={tech} src="" />
              ))}
            </StackContainer>
          </StackWrapper>
          <Image src={image} width="100%" height="100%" />
        </ThunmbnailWrapper>
        <TextContainer>
          <Text content={title} fontType="medium" strong />
          <Text content={description} fontType="base" color="secondary" />
        </TextContainer>
        <CategoryLikeWrapper>
          <CategoryWrapper>{categories}</CategoryWrapper>
          <LikeWrapper>
            <Icon name="thumbs-up" size={20} color={color.greenLight} />
            <Text content={likes} color="secondary" fontType="small" />
          </LikeWrapper>
        </CategoryLikeWrapper>
      </Link>
    </PostContainer>
  );
};

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
