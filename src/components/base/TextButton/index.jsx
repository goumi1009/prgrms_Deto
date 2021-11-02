import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '@components/base/Text';
import color from '@styles/color';

const StyledButton = styled.button`
  display: block;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  background: ${(props) => color[props.color]};
  border-radius: 4px;

  &:hover {
    background: ${(props) => color[props.hoverColor]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const TextButton = ({
  textProps,
  name,
  width,
  height,
  color,
  onClick,
  type,
  selected,
  hoverColor,
  ...props
}) => (
  <StyledButton
    type={type}
    name={name}
    width={width}
    height={height}
    color={color}
    onClick={onClick}
    hoverColor={hoverColor}
    {...props}
  >
    <Text {...textProps} />
  </StyledButton>
);

TextButton.defaultProps = {
  width: 200,
  height: 40,
  color: 'green',
  type: 'button',
  hoverColor: 'green',
  selected: false,
};

TextButton.propTypes = {
  type: PropTypes.string,
  textProps: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  hoverColor: PropTypes.string,
  selected: PropTypes.bool,
};

export default TextButton;
