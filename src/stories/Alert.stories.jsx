import Alert from '@components/base/Alert';

export default {
  title: 'Component/Alert',
  component: Alert,
};

export const Default = (args) => {
  const textProps = {
    content: 'Alert의 Text를 입력해주세요',
  };

  const buttons = [
    {
      textProps: {
        content: '버튼1',
      },
      name: 'buttonOne',
      color: 'greenLight',
      onClick: () => alert('버튼1 cliked'),
    },
    {
      textProps: {
        content: '버튼2',
        fontType: 'micro',
      },
      name: 'buttonTwo',
      color: 'red',
      onClick: () => alert('버튼2 cliked'),
    },
    {
      textProps: {
        content: '버튼3',
      },
      name: 'buttonThree',
      size: 400,
      color: 'green',
      onClick: () => alert('버튼3 cliked'),
    },
  ];
  return <Alert {...args} textProps={textProps} buttons={buttons} />;
};
