import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from '@components/base/Text';
import TextButton from '@components/base/TextButton';

const StyledAlert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Alert = ({ textProps, buttons }) => (
  <StyledAlert>
    <Text {...textProps}>{textProps.content}</Text>
    {buttons.map(({ textProps, name, size, color, onClick }) => (
      <TextButton
        key={name}
        textProps={textProps}
        name={name}
        size={size}
        color={color}
        onClick={onClick}
      />
    ))}
  </StyledAlert>
);

Alert.propTypes = {
  textProps: PropTypes.object.isRequired,
  buttons: PropTypes.array.isRequired,
};

export default Alert;
