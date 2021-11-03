import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import fontType from '@styles/fontType';

const StyledLabel = styled.label`
  display: inline-block;
  margin-bottom: 4px;
  ${(props) => fontType[props.fontType]};
  font-weight: bold;
  color: ${color.secondary};
`;
const StyledInput = styled.input`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  ${(props) => fontType[props.fontType]};
  border: 1px solid ${color.border};
  border-radius: 4px;
  padding: 0 16px;
  background: ${color.white};

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

const Input = ({
  inputType,
  inputId,
  inputName,
  inputFontType,
  placeholder,
  width,
  height,
  labelText,
  labelFontType,
  onChange,
  disabled,
}) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    onChange({ value, name });
  };
  return (
    <>
      {labelText ? (
        <StyledLabel htmlFor={inputId} fontType={labelFontType}>
          {labelText}
        </StyledLabel>
      ) : null}
      <StyledInput
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        width={width}
        height={height}
        onChange={handleChange}
        fontType={inputFontType}
        disabled={disabled}
      />
    </>
  );
};

Input.defaultProps = {
  placeholder: '',
  width: '100%',
  height: 40,
  labelText: '',
  labelFontType: 'small',
  inputFontType: 'base',
  disabled: false,
};

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelText: PropTypes.string,
  labelFontType: PropTypes.string,
  inputFontType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
