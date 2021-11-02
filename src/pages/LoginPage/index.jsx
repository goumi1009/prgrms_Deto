import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '@components/domain/LoginForm';
import PageWrapper from '@components/base/PageWrapper';
import Logo from '@components/base/Logo/index';

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

const LoginPage = () => (
  <FullPageWrapper>
    <Link to="/">
      <Logo size={50} />
    </Link>
    <LoginForm />
  </FullPageWrapper>
);

export default LoginPage;
