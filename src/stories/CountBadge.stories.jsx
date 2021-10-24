import CountBadge from '../components/base/CountBadge';

export default {
  title: 'Component/CountBadge',
  component: CountBadge,
  argTypes: {
    msg: { defaultValue: true, control: 'boolean' },
    count: { defaultValue: 10, control: 'number' },
    maxCount: { defaultValue: 99, control: 'number' },
    userStatus: { defaultValue: true, control: 'boolean' },
  },
};

export const Default = (args) => (
  <CountBadge {...args}>
    <div style={{ width: '400px' }}>사진 USERNAME1</div>
  </CountBadge>
);
