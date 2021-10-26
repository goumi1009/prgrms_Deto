import Avatar from '@components/base/Avatar';

export default {
  title: 'Component/Avatar',
  component: Avatar,
  argTypes: {
    src: { defaultValue: 'https://picsum.photos/200/400' },
    size: {
      defaultValue: 50,
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    mode: {
      defaultValue: 'cover',
      control: 'inline-radio',
      options: ['contain', 'cover', 'fill'],
    },
  },
};

export const Default = (args) => <Avatar {...args} />;
