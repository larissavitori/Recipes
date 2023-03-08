import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { logInTheApplication, navigateMealsToDrinks } from './helpers/helperFunctions';

describe('Test Application Footer Component', () => {
  it('General tests', async () => {
    renderWithRouter(<App />);
    logInTheApplication();

    const beefCategory = await screen.findByTestId('Beef-category-filter');
    const AllCategory = screen.getByTestId('All-category-filter');
    fireEvent.click(beefCategory);
    fireEvent.click(beefCategory);
    fireEvent.click(beefCategory);
    fireEvent.click(AllCategory);
  });

  it('General tests', async () => {
    renderWithRouter(<App />);
    logInTheApplication();
    navigateMealsToDrinks();

    const cocktailCategory = await screen.findByTestId('Cocktail-category-filter');
    const AllCategory = screen.getByTestId('All-category-filter');
    fireEvent.click(cocktailCategory);
    fireEvent.click(cocktailCategory);
    fireEvent.click(cocktailCategory);
    fireEvent.click(AllCategory);
  });
});
