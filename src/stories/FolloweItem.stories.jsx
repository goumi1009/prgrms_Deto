import FollowerItem from '@components/domain/FollowerItem';

export default {
  title: 'Component/FollowerItem ',
  component: FollowerItem,
  argTypes: {
    userProfile: {
      defaultValue: 'https://picsum.photos/200',
    },
    userName: { defaultValue: '똠양꿍', control: 'string' },
  },
};

export const Default = (args) => <FollowerItem {...args} />;
