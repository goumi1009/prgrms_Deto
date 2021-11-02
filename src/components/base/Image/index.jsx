import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

let observer = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

const onIntersection = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const ImageStyle = styled.img`
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  object-fit: ${({ mode }) => mode};
`;

const Image = ({
  isLazy,
  threshold,
  placeholder,
  src,
  width,
  height,
  alt,
  mode,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isLazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => setLoaded(true);

    const imgEl = imgRef.current;
    if (imgEl) {
      imgEl.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    }

    return () => {
      if (imgEl) {
        imgEl.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
      }
    };
  }, [isLazy]);

  useEffect(() => {
    if (!isLazy) {
      return;
    }

    observer = new IntersectionObserver(onIntersection, { threshold });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, [isLazy, threshold]);

  return (
    <ImageStyle
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      width={width}
      height={height}
      mode={mode}
      {...props}
    />
  );
};

Image.defaultProps = {
  isLazy: false,
  threshold: 0,
  width: 'auto',
  height: 'auto',
  alt: '',
  mode: 'cover',
  placeholder: '',
};

Image.propTypes = {
  isLazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Image;
