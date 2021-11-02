import CommentItem from '@components/domain/CommentItem';

export default {
  title: 'Component/CommentItem',
  component: CommentItem,
  argTypes: {},
};

export const Default = (args) => {
  const DUMMY = {
    commentType: '칭찬',
    commentText:
      '국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. ',
    authorUsername: '다람쥐',
    isAuthor: true,
  };

  return (
    <CommentItem
      {...args}
      commentType={DUMMY.commentType}
      commentText={DUMMY.commentText}
      authorUsername={DUMMY.authorUsername}
      isAuthor={DUMMY.isAuthor}
    />
  );
};
