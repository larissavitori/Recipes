import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { logInTheApplication, toBeInTheDocumentAll } from './helpers/helperFunctions';
import { LOGIN_PAGE_DATA } from './helpers/constants';

describe('Test Application Login', () => {
  it('application opens in correct route', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('page elements exist', () => {
    const {
      emailInputDataTestID,
      loginSubmitBtnDataTestID,
      passwordInputDataTestID,
    } = LOGIN_PAGE_DATA;

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailInputDataTestID);
    const passwordInput = screen.getByTestId(passwordInputDataTestID);
    const btnSubmit = screen.getByTestId(loginSubmitBtnDataTestID);

    toBeInTheDocumentAll([emailInput, passwordInput, btnSubmit]);
  });

  it('the login is working correctly', () => {
    const { history } = renderWithRouter(<App />);

    logInTheApplication();

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
