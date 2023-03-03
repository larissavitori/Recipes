import React, { useState } from 'react';
import validator from 'validator';
import { HiOutlineMail } from 'react-icons/hi';
// import { useHistory } from 'react-router-dom';
import { Input } from '../../components';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    emailValidation: false,
    password: '',
    passwordValidation: false,
  });
  // const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    const PASSWORD_LENGTH = 6;

    setLoginData((state) => ({
      ...loginData,
      [name]: value,
      emailValidation: validator.isEmail(state.email),
      passwordValidation: state.password.length >= PASSWORD_LENGTH,
    }));
  };

  const handleClick = () => {
    //
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
        disabled={
          !(loginData.emailValidation && loginData.passwordValidation)
        }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
