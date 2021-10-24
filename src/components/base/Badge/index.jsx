import styled from 'styled-components';
import PropTypes from 'prop-types';
import color from '@styles/color';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  width: 6px;
  height: 6px;
  padding: 0;
  background-color: ${color.greenLight};
  border-radius: 50%;
  transform: translate(50%, -50%);
  width: 6px;
`;

const Badge = ({ children, userStatus }) => {
  let badge = null;

  if (userStatus) {
    badge = <Super />;
  }
  return (
    <BadgeContainer>
      {children}
      {badge}
    </BadgeContainer>
  );
};

Badge.propTypes = {
  children: PropTypes.string.isRequired,
  userStatus: PropTypes.number.isRequired,
};

export default Badge;
