import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import fontType from '@styles/fontType';

const StyledLabel = styled.label`
  display: inline-block;
  margin-bottom: 4px;
  ${(props) => fontType[props.fontType]};
  color: ${color.primary};
`;

const StyledTextarea = styled.textarea`
  display: block;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  border: 1px solid ${color.border};
  resize: none;
  border-radius: 4px;
  padding: 16px;
  background: ${color.white};
  ${(props) => fontType[props.fontType]};

  &:hover {
    background-color: ${color.background};
  }

  &:focus {
    border: 1px solid ${color.green};
  }

  &::placeholder {
    color: ${color.tertiary};
    font-size: 16px;
  }

  &:disabled {
    opacity: 40%;
  }
`;

const Textarea = ({
  labelText,
  labelFontType,
  textareaId,
  textareaName,
  textareaFontType,
  width,
  height,
  onChange,
  value,
  maxLength,
  placeholder,
  disabled,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length > maxLength) {
      alert(`글자 수를 초과하였습니다. (최대 ${maxLength}자)`);
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
        fontType={textareaFontType}
        width={width}
        height={height}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
};

Textarea.defaultProps = {
  labelText: '',
  labelFontType: 'small',
  width: '100%',
  height: 300,
  maxLength: 300,
  textareaFontType: 'base',
  placeholder: '내용을 입력해 주세요',
  disabled: false,
};

Textarea.propTypes = {
  textareaId: PropTypes.string.isRequired,
  textareaName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  labelFontType: PropTypes.string,
  textareaFontType: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Textarea;
