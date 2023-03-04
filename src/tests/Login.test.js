import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Application Login', () => {
  it('the login is working correctly', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnSubmit);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
