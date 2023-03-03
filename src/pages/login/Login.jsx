import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { HiOutlineMail } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { Input } from '../../components';

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
    <div className="login-page">
      <Input
        iType="email"
        iName="email"
        iPlaceholder="Email"
        iDataTestId="email-input"
        iValue={ loginData.email }
        iOnChange={ handleChange }
      >
        <HiOutlineMail />
      </Input>
      <Input
        iType="password"
        iName="password"
        iPlaceholder="Password"
        iDataTestId="password-input"
        iValue={ loginData.password }
        iOnChange={ handleChange }
      >
        <HiOutlineMail />
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

export default Login;
