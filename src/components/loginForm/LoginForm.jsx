import React, { useContext } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import Input from '../inputs/Input';
import { LoginContext } from '../../context';
import Button from '../buttons/Button';

import './loginForm.css';

function LoginForm() {
  const {
    loginData: { password, email },
    validation,
    loginHandleChange,
    loginHandleClick,
  } = useContext(LoginContext);

  return (
    <div className="login-form">
      <Input
        iType="email"
        iName="email"
        iPlaceholder="Email"
        iDataTestId="email-input"
        iValue={ email }
        iOnChange={ loginHandleChange }
      >
        <HiOutlineMail className="i-icon" />
      </Input>
      <Input
        iType="password"
        iName="password"
        iPlaceholder="Password"
        iDataTestId="password-input"
        iValue={ password }
        iOnChange={ loginHandleChange }
      >
        <AiOutlineLock className="i-icon" />
      </Input>
      <Button
        bClassName="btn-enter"
        bDataTestId="login-submit-btn"
        bValidation={ !validation }
        bHandleClick={ loginHandleClick }
        bTitle="Enter"
      />
    </div>
  );
}

export default LoginForm;
