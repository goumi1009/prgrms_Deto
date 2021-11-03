import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '@components/base/Text';
import TextButton from '@components/base/TextButton';

const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Alert = ({ textProps, buttons }) => (
  <StyledAlert>
    <Text {...textProps}>{textProps.content}</Text>
    <ButtonWrapper>
      {buttons.map(({ textProps, name, size, color, hoverColor, onClick }) => (
        <TextButton
          key={name}
          textProps={textProps}
          name={name}
          size={size}
          color={color}
          hoverColor={hoverColor}
          onClick={onClick}
        />
      ))}
    </ButtonWrapper>
  </StyledAlert>
);

Alert.propTypes = {
  textProps: PropTypes.object.isRequired,
  buttons: PropTypes.array.isRequired,
};

export default Alert;
