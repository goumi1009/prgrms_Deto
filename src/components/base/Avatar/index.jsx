import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import ImageComponent from '@components/base/Image';
import color from '@styles/color';

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid ${color.border};
  border-radius: 50%;
  background: ${color.background};
  overflow: hidden;
  width: ${(props) =>
    typeof props.size === 'number' ? `${props.size}px` : props.size};
  height: ${(props) =>
    typeof props.size === 'number' ? `${props.size}px` : props.size};
  img {
    transition: opacity 0.2s ease-out;
  }
`;

const Avatar = ({
  isLazy,
  threshold,
  src,
  size,
  placeholder,
  alt,
  mode,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src)
      src =
        'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png';
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper size={size} {...props}>
      <ImageComponent
        block
        isLazy={isLazy}
        threshold={threshold}
        width="100%"
        height="100%"
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  isLazy: false,
  threshold: 0,
  size: 32,
  placeholder:
    'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
  src:
    'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
  alt: '',
  mode: 'cover',
};

Avatar.propTypes = {
  isLazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Avatar;
