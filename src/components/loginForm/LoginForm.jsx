import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { useHistory } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import Input from '../inputs/Input';

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState(false);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  useEffect(() => {
    const PASSWORD_LENGTH = 6;
    const isValid = !!(
      validator.isEmail(loginData.email) && loginData.password.length >= PASSWORD_LENGTH
    );

    setValidation(isValid);
  }, [loginData]);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
    history.push('/meals');
  };

  return (
    <div className="login-form">
      <Input
        iType="email"
        iName="email"
        LoginForm
      >
        <HiOutlineMail className="i-icon" />
      </Input>
      <Input
        iType="password"
        iName="password"
        iPlaceholder="Password"
        iDataTestId="password-input"
        iValue={ loginData.password }
        iOnChange={ handleChange }
      >
        <AiOutlineLock className="i-icon" />
      </Input>
      <button
        className="btn-enter"
        data-testid="login-submit-btn"
        disabled={ !validation }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default LoginForm;
