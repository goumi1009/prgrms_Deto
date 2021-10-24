import Badge from '../components/base/Badge';

export default {
  title: 'Component/Badge',
  component: Badge,
  argTypes: {
    userStatus: { defaultValue: true, control: 'boolean' },
  },
};

export const Default = (args) => (
  <Badge {...args}>
    <div>사진 USERNAME1</div>
  </Badge>
);
