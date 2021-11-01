import { useState } from 'react';
import styled from 'styled-components';
import color from '@styles/color';
import PropTypes from 'prop-types';
import Input from '@components/base/Input';
import TextButton from '@components/base/TextButton';
import { getUserList } from '@utils/api';

const FormStyle = styled.form`
  display: block;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  padding: 40px;
  margin: 30px auto;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
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

const initialValues = {
  email: '',
  fullName: '',
  username: '',
  password: '',
  passwordCheck: '',
};

const validate = (
  { email, fullName, username, password, passwordCheck },
  idCheck,
) => {
  const newErrors = {};
  if (!email || !fullName || !username || !password || !passwordCheck)
    newErrors.empty = '모두 입력해주세요';
  if (password !== passwordCheck)
    newErrors.passwordCheck = '비밀번호가 일치하지 않습니다';
  if (!idCheck) newErrors.email = '이메일 중복체크를 해주세요.';
  return newErrors;
};

const SignupForm = ({ onSubmit, onClick }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [idCheck, setIdCheck] = useState(false);

  const checkEmail = (value) => {
    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e;
    setValues({ ...values, [name]: value });
    if (name === 'email') {
      setIdCheck(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(values, idCheck);
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
      onClick();
    }
    setErrors(newErrors);
  };

  const handleChekClick = async () => {
    const userList = await getUserList();
    const checked = await userList.some((user) => user.email === values.email);

    if (checkEmail(values.email)) {
      if (!checked) {
        setIdCheck(true);
      } else {
        alert('이미 사용중인 이메일 입니다.');
      }
    } else {
      alert('이메일 양식 오류');
    }
    return checked;
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <InputRow>
        <Input
          labelText="이메일"
          labelFontType="small"
          inputType="email"
          inputId="signupEmail"
          placeholder="이메일 주소를 입력하세요"
          inputName="email"
          onChange={handleChange}
        />
        <TextButton
          textProps={{ content: '중복체크', color: 'white', strong: true }}
          disabled={idCheck}
          onClick={handleChekClick}
        />
      </InputRow>
      <InputRow>
        <Input
          labelText="이름"
          labelFontType="small"
          inputType="text"
          inputName="fullName"
          inputId="signuFullName"
          placeholder="이름을 입력하세요"
          onChange={handleChange}
        />
      </InputRow>
      <InputRow>
        <Input
          labelText="닉네임"
          labelFontType="small"
          inputType="text"
          inputName="username"
          inputId="signupUsername"
          placeholder="닉네임을 입력하세요"
          onChange={handleChange}
        />
      </InputRow>
      <InputRow>
        <Input
          labelText="비밀번호"
          labelFontType="small"
          inputType="password"
          inputName="password"
          inputId="signupPassword"
          placeholder="암호를 입력하세요"
          onChange={handleChange}
        />
      </InputRow>
      <InputRow>
        <Input
          labelText="비밀번호 확인"
          labelFontType="small"
          inputType="password"
          inputName="passwordCheck"
          inputId="signupPasswordCheck"
          placeholder="암호를 입력하세요"
          onChange={handleChange}
        />
      </InputRow>
      <InputRow>
        <TextButton
          textProps={{ content: '회원가입', color: 'white', strong: true }}
          type="submit"
        />
      </InputRow>
      {errors.empty ?? <ErrorText>{errors.empty}</ErrorText>}
      {errors.passwordCheck ?? <ErrorText>{errors.passwordCheck}</ErrorText>}
      {errors.email ?? <ErrorText>{errors.email}</ErrorText>}
    </FormStyle>
  );
};

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SignupForm;
