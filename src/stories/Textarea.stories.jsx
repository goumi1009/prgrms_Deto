import Textarea from '@components/base/Textarea';

export default {
  title: 'Component/Textarea',
  component: Textarea,
};

export const Default = (args) => (
  <Textarea {...args} labelText="라벨" placeholder="텍스트를 입력해주세요" />
);
