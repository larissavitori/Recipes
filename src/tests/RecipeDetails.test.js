import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test Application RecipeDetails Page', () => {
  it('General tests', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'asdasdasd@asdasd.com');
    userEvent.type(passwInput, '12345678');
    userEvent.click(loginBtn);
    const firstMeal = await screen.findByAltText('Foto: Corba');
    userEvent.click(firstMeal);
    const recommendedGG = await screen.findByAltText('Foto: GG');
    userEvent.click(recommendedGG);
  });
  it('General tests', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'asdasdasd@asdasd.com');
    userEvent.type(passwInput, '12345678');
    userEvent.click(loginBtn);
    const firstMeal = await screen.findByAltText('Foto: Corba');
    userEvent.click(firstMeal);
    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);
    const firstCheckbox = await screen.findByTestId('0-ingredient-step');
    userEvent.click(firstCheckbox);
    act(() => {
      history.push('/meals/52977');
    });
    const continueButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(continueButton);
  });
});
