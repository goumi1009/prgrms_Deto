import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from '@components/base/Avatar';
import Text from '@components/base/Text';

const ProfileBoxWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  > div {
    margin-right: 8px;
  }
`;

const ProfileBox = ({ src, size, alt, content, fontType, strong, color }) => (
  <ProfileBoxWrapper>
    <Avatar src={src} size={size} alt={alt} />
    <Text content={content} fontType={fontType} strong={strong} color={color} />
  </ProfileBoxWrapper>
);

ProfileBox.defaultProps = {
  fontType: 'tiny',
  strong: true,
  color: 'green',
  size: 32,
  alt: '',
};

ProfileBox.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  content: PropTypes.string.isRequired,
  fontType: PropTypes.string,
  strong: PropTypes.string,
  color: PropTypes.string,
  alt: PropTypes.string,
};

export default ProfileBox;
