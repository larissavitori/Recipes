import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { Drinks, Meals } from '../pages';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test Application Footer Component', () => {
  it('General tests', () => {
    renderWithRouter(<Drinks />);

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);
  });
  it('General tests', () => {
    renderWithRouter(<Meals />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksButton);
  });
});
