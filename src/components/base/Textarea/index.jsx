import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import fontType from '@styles/fontType';

const StyledTextarea = styled.textarea`
  display: block;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border: 1px solid ${color.border};
  resize: none;
`;

const StyledLabel = styled.label`
  ${(props) => fontType[props.fontType]};
`;

const Textarea = ({
  labelText,
  labelFontType,
  textareaId,
  textareaName,
  width,
  height,
}) => (
  <>
    {labelText ? (
      <StyledLabel for={textareaId} fontType={labelFontType}>
        {labelText}
      </StyledLabel>
    ) : null}
    <StyledTextarea
      id={textareaId}
      name={textareaName}
      width={width}
      height={height}
    />
  </>
);

Textarea.defaultProps = {
  labelText: '',
  labelFontType: 'base',
  width: 264,
  height: 300,
};

Textarea.propTypes = {
  textareaId: PropTypes.string.isRequired,
  textareaName: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  labelFontType: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Textarea;
