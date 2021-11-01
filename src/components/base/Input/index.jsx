import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import fontType from '@styles/fontType';

const StyledInput = styled.input`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  font-size: 16px;
  border: 1px solid ${color.border};
  border-radius: 4px;
  padding: 0 16px;

  &::placeholder {
    color: ${color.tertiary};
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border: 1px solid ${color.green};
  }
`;

const StyledLabel = styled.label`
  ${(props) => fontType[props.fontType]};
`;

const Input = ({
  inputType,
  inputId,
  inputName,
  placeholder,
  width,
  height,
  labelText,
  labelFontType,
  onChange,
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
      />
    </>
  );
};

Input.defaultProps = {
  placeholder: '',
  width: '100%',
  height: 40,
  labelText: '',
  labelFontType: 'base',
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
  onChange: PropTypes.func.isRequired,
};

export default Input;
