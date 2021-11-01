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
  onChange,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length > 300) {
      alert('글자 수를 초과하였습니다. (최대 300자)');
      return;
    }
    onChange({ value, name: textareaName });
  };
  return (
    <>
      {labelText ? (
        <StyledLabel htmlFor={textareaId} fontType={labelFontType}>
          {labelText}
        </StyledLabel>
      ) : null}
      <StyledTextarea
        id={textareaId}
        name={textareaName}
        width={width}
        height={height}
        onChange={handleChange}
      />
    </>
  );
};

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
  onChange: PropTypes.func.isRequired,
};

export default Textarea;
