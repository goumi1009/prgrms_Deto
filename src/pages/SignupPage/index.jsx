import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SignupForm from '@components/domain/SignupForm';
import Modal from '@components/base/Modal';
import Alert from '@components/base/Alert';
import { sendSignUp } from '@utils/api';

const PageWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 30px;
  h1 {
    text-align: center;
  }
`;

const SignupPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { email, fullName, username, password } = values;
    await sendSignUp({ email, fullName, username, password });
    setIsVisible(true);
  };

  return (
    <PageWrapper>
      <h1>회원가입</h1>
      <SignupForm onSubmit={onSubmit} />
      <Modal isVisible={isVisible}>
        <Alert
          textProps={{ content: '회원가입에 성공하였습니다!' }}
          buttons={[
            {
              textProps: { content: '확인' },
              name: 'submitButton',
              onClick: () => history.push('/user/login'),
            },
          ]}
        />
      </Modal>
    </PageWrapper>
  );
};

export default SignupPage;
