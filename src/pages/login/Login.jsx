import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Input } from '../../components';
import logo from '../../images/logo-recipes-app.png';

import './login.css';

function Login() {
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
    <main className="login-page">
      <img className="logo-image" src={ logo } alt="logo recipes app" />
      <div className="login-form">
        <Input
          iType="email"
          iName="email"
          iPlaceholder="Email"
          iDataTestId="email-input"
          iValue={ loginData.email }
          iOnChange={ handleChange }
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
    </main>
  );
}

export default Login;
