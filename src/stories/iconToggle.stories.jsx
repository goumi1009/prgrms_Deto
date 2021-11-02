/* eslint-disable no-console */
import IconToggle from '@components/base/IconToggle';

export default {
  title: 'Component/IconToggle',
  component: IconToggle,
  argTypes: {
    src: { defaultValue: 'https://picsum.photos/200/400' },
    name: { defaultValue: 'Vue' },
  },
};

export const Default = (args) => <IconToggle {...args} />;
