import styled from 'styled-components';
import PropTypes from 'prop-types';
import color from '@styles/color';
import fontType from '@styles/fontType';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  color: ${color.white};
  background-color: ${color.green};
  border-radius: 20px;
  transform: translate(50%, -50%);
  ${fontType.micro};

  &.msg {
    top: 50%;
    right: 30%;
  }
`;

const CountBadge = ({ children, count, msg = true, ...props }) => {
  let badge = null;
  const maxCount = 99;

  if (msg && count > 0) {
    badge = (
      <Super className="msg">
        {maxCount && count > maxCount ? `${maxCount}+` : count}
      </Super>
    );
  } else if (count > 0) {
    badge = (
      <Super>{maxCount && count > maxCount ? `${maxCount}+` : count}</Super>
    );
  }

  return (
    <BadgeContainer {...props}>
      {children}
      {badge}
    </BadgeContainer>
  );
};

CountBadge.propTypes = {
  children: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  msg: PropTypes.bool.isRequired,
};

export default CountBadge;
