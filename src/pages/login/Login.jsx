import React from 'react';
import logo from '../../images/logo-recipes-app.png';
import { LoginForm } from '../../components';

import './login.css';

function Login() {
  return (
    <main className="login-page">
      <img className="logo-image" src={ logo } alt="logo recipes app" />
      <LoginForm />
    </main>
  );
}

export default Login;
