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
  };

  return (
    <PageWrapper>
      <h1>회원가입</h1>
      <SignupForm onSubmit={onSubmit} onClick={() => setIsVisible(true)} />
      <Modal isVisible={isVisible}>
        <Alert
          textProps={{ content: '작성을 완료하시겠습니까?' }}
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
