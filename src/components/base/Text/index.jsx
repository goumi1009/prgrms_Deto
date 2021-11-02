import styled from 'styled-components';
import PropTypes from 'prop-types';
import fontType from '@styles/fontType';
import color from '@styles/color';

const StyledText = styled.span`
  ${(props) => fontType[props.fontType]}
  font-weight: ${(props) => (props.strong ? 'bold' : undefined)};
  color: ${(props) => color[props.color] || props.color};
`;

const Text = ({ content, fontType, strong, color }) => (
  <StyledText fontType={fontType} strong={strong} color={color}>
    {content}
  </StyledText>
);

Text.defaultProps = {
  content: 'Text를 입력해주세요',
  fontType: 'base',
  strong: false,
  color: 'primary',
};

Text.propTypes = {
  content: PropTypes.string,
  fontType: PropTypes.string,
  strong: PropTypes.bool,
  color: PropTypes.string,
};

export default Text;
