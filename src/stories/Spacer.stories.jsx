import Spacer from '@components/base/Spacer';
import PropTypes from 'prop-types';

export default {
  title: 'Component/Spacer',
  component: Spacer,
};

const Box = ({ style }) => (
  <div
    style={{
      display: 'block',
      width: 100,
      height: 100,
      backgroundColor: 'black',
      ...style,
    }}
  />
);

Box.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object.isRequired,
};

export const Vertical = (args) => (
  <Spacer {...args}>
    <Box />
    <Box />
    <Box />
  </Spacer>
);
