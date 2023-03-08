import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { logInTheApplication } from './helpers/helperFunctions';
import { FOOTER_COMPONENT_DATA } from './helpers/constants';
import mockCategory from './helpers/mockCategory.json';
import mockData from './helpers/mockData.json';
import mockFetch from './helpers/mockFetch';

describe('Test Application Footer Component', () => {
  beforeEach(() => {
    mockFetch(mockCategory, mockData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('General tests', () => {
    const { drinksButtonDataTestId, mealsButtonDataTestId } = FOOTER_COMPONENT_DATA;
    const { history } = renderWithRouter(<App />);

    logInTheApplication();

    const drinksButton = screen.getByTestId(drinksButtonDataTestId);
    expect(drinksButton).toBeInTheDocument();
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
    const mealsButton = screen.getByTestId(mealsButtonDataTestId);
    expect(mealsButton).toBeInTheDocument();
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
