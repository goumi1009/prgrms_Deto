import PropTypes from 'prop-types';
import LogoSvg from '@assets/logo.svg';

const Logo = ({ size }) => (
  <img src={LogoSvg} size={size} alt="디토, 데브 토이프로젝트" />
);

Logo.defaultProps = {
  size: 18,
};

Logo.propTypes = {
  size: PropTypes.number,
};

export default Logo;
