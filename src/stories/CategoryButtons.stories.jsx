import CategoryButtons from '@components/domain/CategoryButtons';

export default {
  title: 'Component/CategoryButtons',
  component: CategoryButtons,
  argTypes: {
    toggleColor: { control: 'text' },
  },
};

export const Default = (args) => (
  <CategoryButtons
    {...args}
    categoryList={['재미', '커뮤니티', '교육', '개발', '기타']}
    onToggle={() => console.log('토글!')}
  />
);
