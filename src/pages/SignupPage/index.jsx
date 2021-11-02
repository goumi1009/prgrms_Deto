import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '@components/base/PageWrapper';
import SignupForm from '@components/domain/SignupForm';
import Modal from '@components/base/Modal';
import Alert from '@components/base/Alert';
import Logo from '@components/base/Logo/index';
import { sendSignUp } from '@utils/api';

const FullPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 100vh;

  > a {
    margin-top: -80px;
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
    <FullPageWrapper>
      <Link to="/">
        <Logo size={50} />
      </Link>
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
    </FullPageWrapper>
  );
};

export default SignupPage;
