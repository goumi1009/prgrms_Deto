import PostInfo from '@components/domain/PostInfo';
import { useState } from 'react';

export default {
  title: 'Component/PostInfo',
  component: PostInfo,
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

export const Default = (args) => {
  const [isPostLike, setIsPostLike] = useState(false);
  const [postLikesCount, setPostLikesCount] = useState(0);

  const DUMMY = {
    postId: '132e904jkld2',
    userName: 'goum',
    userProfile: 'https://picsum.photos/200',
    postCategory: ['재미', '라이프'],
    postTitle: '재미있는 토이프로젝트',
    postDescription: `환경권의 내용과 행사에 관하여는 법률로 정한다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그
      정치적 중립성은 준수된다. 헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다. 국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 
      국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 국가는 모성의 보호를 위하여 노력하여야 한다. 군사재판을 관할하기 위하여 특별법원으로서 군사법원을 둘 수 있다. 
      대법원장은 국회의 동의를 얻어 대통령이 임명한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다....`,
    postTechStack: ['react', 'redux'],
    postDeployLink: 'https://simpleicons.org/',
    postGithubLInk: 'https://simpleicons.org/',
    postCreatedAt: '2021-10-28',
    postFiles: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],
    postLikesCount: 88,
    isPostLike: true,
    onClick: (isLike, likesCount) => {
      setIsPostLike(isLike);
      setPostLikesCount(likesCount);
      console.log(isLike, isPostLike);
      console.log(likesCount, postLikesCount);
    },
  };

  return (
    <PostInfo
      {...args}
      postId={DUMMY.postId}
      userName={DUMMY.userName}
      userProfile={DUMMY.userProfile}
      postCategory={DUMMY.postCategory}
      postTitle={DUMMY.postTitle}
      postDescription={DUMMY.postDescription}
      postTechStack={DUMMY.postTechStack}
      postDeployLink={DUMMY.postDeployLink}
      postGithubLInk={DUMMY.postGithubLInk}
      postCreatedAt={DUMMY.postCreatedAt}
      postFiles={DUMMY.postFiles}
      isPostLike={isPostLike}
      postLikesCount={postLikesCount}
      onClick={DUMMY.onClick}
    />
  );
};
