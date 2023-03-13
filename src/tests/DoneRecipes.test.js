import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { logInTheApplication } from './helpers/helperFunctions';
import mockData from './helpers/mockData.json';
import mockCategory from './helpers/mockCategory.json';
import mockFetch from './helpers/mockFetch';

describe('Test Application RecipeDetails Page', () => {
  beforeEach(() => {
    mockFetch(mockCategory, mockData);

    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('General tests', async () => {
    renderWithRouter(<App />);
    logInTheApplication();
    const firstMeal = await screen.findByTestId('0-recipe-card');
    userEvent.click(firstMeal);
    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);
    const checkbox0 = await screen.findByTestId('0-ingredient-step');
    const checkbox1 = await screen.findByTestId('1-ingredient-step');
    userEvent.click(checkbox0);
    userEvent.click(checkbox1);
    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton.disabled).toBe(false);
    // act(() => {
    //   history.push('/done-recipes');
    // });
    // const filterMeal = screen.getByTestId('filter-by-meal-btn');
    // userEvent.click(filterMeal);
    // const filterDrink = screen.getByTestId('filter-by-drink-btn');
    // userEvent.click(filterDrink);
    // const filterAll = screen.getByTestId('filter-by-all-btn');
    // userEvent.click(filterAll);
  });
});
