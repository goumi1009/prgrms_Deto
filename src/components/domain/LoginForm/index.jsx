import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '@contexts/AuthProvider';
import Input from '@components/base/Input';
import TextButton from '@components/base/TextButton';
import Text from '@components/base/Text';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { handleLogin } = useAuthContext();
  const history = useHistory();

  const handleInput = ({ value, name }) => {
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const success = await handleLogin(loginInfo);
    if (success) {
      history.push('/');
    }
  };

  return (
    <StyledForm>
      <Input
        inputType="email"
        inputId="loginEmail"
        inputName="email"
        placeholder="이메일 주소를 입력하세요"
        width={264}
        onChange={handleInput}
      />
      <Input
        inputType="password"
        inputId="loginPassword"
        inputName="password"
        placeholder="비밀번호를 입력하세요"
        width={264}
        onChange={handleInput}
      />
      <TextButton textProps={{ content: '로그인' }} onClick={handleSubmit} />
      <Link to="/user/signup">
        <Text content="회원가입 하러 가기" />
      </Link>
    </StyledForm>
  );
};

export default LoginForm;
