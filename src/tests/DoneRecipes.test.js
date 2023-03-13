import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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
    const { history } = renderWithRouter(<App />);
    logInTheApplication();
    const firstMeal = await screen.findByTestId('0-recipe-card');
    userEvent.click(firstMeal);
    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);
    const checkboxes = await screen.findAllByRole('checkbox');
    checkboxes[0].checked = true;
    checkboxes[1].checked = true;
    const finishButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishButton);
    await waitFor(() => {
      const filterMeal = screen.getByTestId('filter-by-meal-btn');
      userEvent.click(filterMeal);
    });
    const filterMeal = await screen.findByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);

    const filterDrink = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    const filterAll = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(filterAll);
    act(() => {
      history.push('/meals');
    });
    act(() => {
      history.push('/done-recipes');
    });
  });
});
