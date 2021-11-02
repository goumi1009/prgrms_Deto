import CategoryNav from '@components/domain/CategoryNav';

export default {
  title: 'Component/CategoryNav',
  component: CategoryNav,
};

export const Default = () => (
  <CategoryNav onClick={(clickedCategory) => console.log(clickedCategory)} />
);
