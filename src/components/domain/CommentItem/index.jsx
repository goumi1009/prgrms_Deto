import styled from '@emotion/styled';
import { PropTypes } from 'prop-types';
import ProfileBox from '@components/base/ProfileBox';
import Text from '@components/base/Text/index';
import Icon from '@components/base/Icon';
import color from '@styles/color';

const ItemStyle = styled.li`
  padding: 16px 0;
  > div {
    margin-bottom: 4px;
  }
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 32px;
    height: 32px;
    margin-left: auto;
    padding: 0;
    text-align: right;
  }
`;

const CommentTextWrapper = styled.p`
  span:first-child {
    display: inline-block;
    margin-right: 4px;
    background-color: ${color.green};
    padding: 0 8px;
    border-radius: 14px;
  }
`;

const CommentItem = ({
  commentId,
  commentType,
  commentText,
  authorUsername,
  authorProfile,
  isAuthor,
  onDelete,
}) => (
  <ItemStyle>
    <AuthorWrapper>
      <ProfileBox
        src={authorProfile}
        size={40}
        content={authorUsername}
        fontType="base"
        color="dark"
      />
      {isAuthor ? (
        <button
          type="button"
          onClick={() => {
            onDelete(commentId);
          }}
        >
          <Icon color={color.secondary} name="x" size={16} />
        </button>
      ) : undefined}
    </AuthorWrapper>
    <CommentTextWrapper>
      <Text content={commentType} fontType="tiny" color="white" strong />
      <Text content={commentText} fontType="small" />
    </CommentTextWrapper>
  </ItemStyle>
);

CommentItem.defaultProps = {
  authorProfile:
    'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
};

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
  commentType: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
  authorUsername: PropTypes.string.isRequired,
  authorProfile: PropTypes.string,
  isAuthor: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentItem;
