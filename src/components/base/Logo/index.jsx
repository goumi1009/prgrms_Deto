import styled from 'styled-components';
import PropTypes from 'prop-types';
import color from '@styles/color';

const StyledText = styled.span`
  color: ${color.green};
  font-size: ${(props) => `${props.size}px`};
  font-weight: bold;
`;

const Logo = ({ size }) => <StyledText size={size}>Deto</StyledText>;

Logo.defaultProps = {
  size: 18,
};

Logo.propTypes = {
  size: PropTypes.number,
};

export default Logo;
