import Input from '@components/base/Input';

export default {
  title: 'Component/Input',
  component: Input,
  argTypes: {
    labelText: { defaultValue: '' },
  },
};

export const Default = (args) => <Input {...args} labelText="라벨이지요" />;
