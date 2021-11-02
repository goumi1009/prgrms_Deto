import ProfileBox from '@components/base/ProfileBox';

export default {
  title: 'Component/ProfileBox',
  component: ProfileBox,
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
    fontType: {
      defaultValue: 'base',
      control: {
        type: 'text',
      },
    },
    content: {
      defaultValue: 'nickname',
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = (args) => <ProfileBox {...args} />;
