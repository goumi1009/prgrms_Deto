import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '@styles/color';
import fontType from '@styles/fontType';

const StyledInput = styled.input`
  width: ${(props) => `${props.width}px`};
  font-size: 16px;
  border: 1px solid ${color.border};
  border-radius: 4px;
  padding: 8px 16px;

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
  placeholder,
  width,
  labelText,
  labelFontType,
}) => (
  <>
    {labelText ? (
      <StyledLabel for={inputId} fontType={labelFontType}>
        {labelText}
      </StyledLabel>
    ) : null}
    <StyledInput
      type={inputType}
      id={inputId}
      placeholder={placeholder}
      width={width}
    />
  </>
);

Input.defaultProps = {
  width: 264,
  labelText: '',
  labelFontType: 'base',
};

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number,
  labelText: PropTypes.string,
  labelFontType: PropTypes.string,
};

export default Input;
