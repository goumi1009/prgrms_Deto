import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '@contexts/AuthProvider';
import color from '@styles/color';
import Input from '@components/base/Input';
import TextButton from '@components/base/TextButton';
import Text from '@components/base/Text';

const StyledForm = styled.form`
  display: block;
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  padding: 30px;
`;

const InputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 16px;

  label {
    width: 100%;
    flex-shrink: 0;
    font-weight: bold;
  }

  input {
    flex: 1;
  }

  button {
    flex-shrink: 0;

    &:disabled {
      background: ${color.border};
      cursor: default;
    }
  }
`;

const SignUpLink = styled(Link)`
  display: block;
  margin-top: 16px;
  text-align: center;

  &:hover span {
    color: ${color.green};
    border-bottom: 1px solid;
  }
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
      <InputRow>
        <Input
          inputType="email"
          inputId="loginEmail"
          inputName="email"
          placeholder="이메일 주소를 입력하세요"
          width={264}
          onChange={handleInput}
        />
      </InputRow>
      <InputRow>
        <Input
          inputType="password"
          inputId="loginPassword"
          inputName="password"
          placeholder="비밀번호를 입력하세요"
          width={264}
          onChange={handleInput}
        />
      </InputRow>
      <TextButton
        textProps={{
          content: '로그인',
          color: 'white',
          strong: true,
          fontType: 'base',
        }}
        width="100%"
        height={48}
        onClick={handleSubmit}
        color="gradient"
      />
      <SignUpLink to="/user/signup">
        <Text content="회원가입 하러 가기" fontType="small" />
      </SignUpLink>
    </StyledForm>
  );
};

export default LoginForm;
