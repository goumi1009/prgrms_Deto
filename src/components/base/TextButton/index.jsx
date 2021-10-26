import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '@components/base/Text';
import color from '@styles/color';

const StyledButton = styled.button`
  width: ${(props) => `${props.size}px`};
  background-color: ${(props) => color[props.color]};
`;

const TextButton = ({ textProps, name, size, color, onClick }) => (
  <StyledButton
    type="button"
    name={name}
    size={size}
    color={color}
    onClick={onClick}
  >
    <Text {...textProps} />
  </StyledButton>
);

TextButton.defaultProps = {
  size: 80,
  color: 'green',
};

TextButton.propTypes = {
  textProps: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
