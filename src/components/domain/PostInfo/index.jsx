import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import color from '@styles/color';
import fontType from '@styles/fontType';
import ProfileBox from '@components/base/ProfileBox';
import Text from '@components/base/Text';
import Image from '@components/base/Image';
import Avatar from '@components/base/Avatar';
import Icon from '@components/base/Icon';
import java from '@assets/icon/java.svg';
import githubIcon from '@assets/icon/github.svg';
import javascript from '@assets/icon/javascript.svg';
import nodedotjs from '@assets/icon/nodedotjs.svg';
import python from '@assets/icon/python.svg';
import react from '@assets/icon/react.svg';
import typescript from '@assets/icon/typescript.svg';
import vuedotjs from '@assets/icon/vuedotjs.svg';

const techIcon = {
  Java: java,
  JavaScript: javascript,
  'Node.js': nodedotjs,
  Python: python,
  TypeScript: typescript,
  react,
  Vue: vuedotjs,
};

const PostInfoWrapper = styled.div`
  margin-bottom: 60px;
`;

const ImageWrapper = styled.div`
  margin: 16px 0;
  img {
    width: 100%;
    margin: 0 auto;
  }
`;

const CategoryList = styled.ul`
  display: flex;
  gap: 4px;
  span {
    display: block;
    width: auto;
    background-color: ${color.tertiary};
    border-radius: 3px;
    padding: 2px 8px;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

const CreateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
`;

const PostTitle = styled.h2`
  margin-bottom: 8px;
`;

const StackList = styled.ul`
  display: flex;
  gap: 4px;
  margin-top: 16px;

  li:not(:first-child) {
    margin-left: -12px;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${color.green};
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const PlayLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.white};
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-image: ${color.gradient};
  i {
    margin-right: 4px;
  }
  &:hover {
    background: ${color.green};
  }
`;

const GithubLInk = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color.white};
  border-radius: 50%;
  ${fontType.small};
  font-weight: bold;
  width: 40px;
  height: 40px;
`;

const PostInfo = ({ postData, onClick, isLiked }) => {
  const {
    postId,
    userName,
    userProfile,
    category,
    title,
    description,
    techStack,
    deployLink,
    githubLink,
    image,
    updatedAt,
    likesCount,
    userId,
  } = postData;

  return (
    <PostInfoWrapper>
      <CategoryList>
        {(category || []).map((category, index) => {
          const categoryKey = `${postId}${index}`;
          return (
            <li key={categoryKey}>
              <Text content={category} fontType="micro" color="white" />
            </li>
          );
        })}
      </CategoryList>
      <ImageWrapper>{image ? <Image src={image} /> : undefined}</ImageWrapper>
      <CreateInfo>
        <Link to={`/user/${userId}`}>
          <ProfileBox
            src={userProfile || ''}
            size={48}
            content={userName || ''}
            fontType="base"
            color="primary"
          />
        </Link>
        <Text content={updatedAt} color="tertiary" fontType="small" />
      </CreateInfo>
      <StackList>
        {techStack
          ? (techStack || []).map((tech, index) => {
              const TechStackKey = `${postId}${index}`;
              return (
                <li key={TechStackKey}>
                  <Avatar size={32} alt={tech} src={techIcon[tech]} />
                </li>
              );
            })
          : undefined}
      </StackList>
      <PostTitle>
        <Text content={title} fontType="medium" />
      </PostTitle>
      <p>
        <Text content={description} fontType="base" />
      </p>
      <LinkWrapper>
        <PlayLink href={deployLink} target="_blank">
          <Icon
            name="play"
            size={18}
            color={color.white}
            hoverColor={color.white}
          />
          Play
        </PlayLink>
        {githubLink ? (
          <GithubLInk href={githubLink} target="_blank" rel="noreferrer">
            <img src={githubIcon} alt="githublink" />
          </GithubLInk>
        ) : undefined}
        <LikeWrapper>
          <button
            type="button"
            onClick={() => {
              onClick(isLiked);
            }}
          >
            <Icon
              name="thumbs-up"
              color={isLiked ? color.greenLight : color.secondary}
            />
          </button>
          <Text content={likesCount} />
        </LikeWrapper>
      </LinkWrapper>
    </PostInfoWrapper>
  );
};

PostInfo.propTypes = {
  postData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

export default PostInfo;
