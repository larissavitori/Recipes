import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import validator from 'validator';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState(false);
  const history = useHistory();

  const loginHandleChange = ({ target: { name, value } }) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginHandleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
    history.push('/meals');
  };

  useEffect(() => {
    const PASSWORD_LENGTH = 7;
    const isValid = !!(
      validator.isEmail(loginData.email) && loginData.password.length >= PASSWORD_LENGTH
    );

    setValidation(isValid);
  }, [loginData]);

  const LoginState = useMemo(() => ({
    loginData,
    validation,
    loginHandleChange,
    loginHandleClick,
  }), [loginData, validation]);

  return (
    <LoginContext.Provider value={ LoginState }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LoginProvider;
