import PostDetailPage from '@pages/PostDetailPage';

export default {
  title: 'Component/PostDetailpage',
  component: PostDetailPage,
  argTypes: {
    src: { defaultValue: 'https://picsum.photos/200/400' },
    content: {
      defaultValue: 'nickname',
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = (args) => <PostDetailPage {...args} />;
