import { PropTypes } from 'prop-types';
import color from '@styles/color';
import styled from 'styled-components';

const featherIcon = require('feather-icons');

const IconWrapper = styled.i`
  display: inline-block;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
`;

const Icon = ({ name, size, strokeWidth, color, rotate, ...props }) => {
  const iconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  const icon = featherIcon.icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const base64 = Buffer.from(svg, 'utf8').toString('base64');

  return (
    <IconWrapper {...props} size={size} rotate={rotate}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
};

Icon.defaultProps = {
  size: 24,
  strokeWidth: 2,
  color: color.border,
  rotate: 0,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
  rotate: PropTypes.number,
};
export default Icon;
