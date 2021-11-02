import { PropTypes } from 'prop-types';
import color from '@styles/color';
import styled from 'styled-components';

const featherIcon = require('feather-icons');

const IconWrapper = styled.i`
  display: inline-block;
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};

  img {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.2s ease-in;

    &:last-child {
      opacity: 0;
    }
  }

  &:hover {
    img:first-child {
      opacity: 0;
    }
    img:last-child {
      opacity: 1;
    }
  }
`;

const Icon = ({
  name,
  size,
  strokeWidth,
  color,
  hoverColor,
  rotate,
  ...props
}) => {
  const iconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  const hoverIconStyle = {
    'stroke-width': strokeWidth,
    stroke: hoverColor,
    width: size,
    height: size,
  };

  const icon = featherIcon.icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const hoverSvg = icon ? icon.toSvg(hoverIconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');
  const hoverBase64 = Buffer.from(hoverSvg, 'utf8').toString('base64');

  return (
    <IconWrapper {...props} size={size} rotate={rotate}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
      <img src={`data:image/svg+xml;base64,${hoverBase64}`} alt={name} />
    </IconWrapper>
  );
};

Icon.defaultProps = {
  size: 24,
  strokeWidth: 2,
  color: color.border,
  hoverColor: color.secondary,
  rotate: 0,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  rotate: PropTypes.number,
};
export default Icon;
