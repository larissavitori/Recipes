import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { logInTheApplication, navigateMealsToDrinks } from './helpers/helperFunctions';
import mockData from './helpers/mockData.json';
import mockCategory from './helpers/mockCategory.json';
import mockFetch from './helpers/mockFetch';

describe('Test Application Footer Component', () => {
  beforeEach(() => {
    mockFetch(mockCategory, mockData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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
