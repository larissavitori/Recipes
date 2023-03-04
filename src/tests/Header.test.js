import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { logInTheApplication, toBeInTheDocumentAll, navigateToProfile } from './helpers/helperFunctions';
import { HEADER_COMPONENT_DATA } from './helpers/constants';

describe('Test Application Header Component', () => {
  it('components elements exist', () => {
    renderWithRouter(<App />);

    logInTheApplication();

    const {
      profileIconDataTestID,
      searchBtnDataTestID,
      pageTitleDataTestID,
    } = HEADER_COMPONENT_DATA;

    const profileIcon = screen.getByTestId(profileIconDataTestID);
    const searchBtn = screen.getByTestId(searchBtnDataTestID);
    const pageTitle = screen.getByTestId(pageTitleDataTestID);

    toBeInTheDocumentAll([profileIcon, searchBtn, pageTitle]);
  });

  it('Navigate to Profile', () => {
    const { history } = renderWithRouter(<App />);

    logInTheApplication();

    navigateToProfile();

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Open Search Button', () => {
    const {
      searchBtnDataTestID,
      searchInputDataTestID,
      searchTextTest,
    } = HEADER_COMPONENT_DATA;

    renderWithRouter(<App />);

    logInTheApplication();

    const searchBtn = screen.getByTestId(searchBtnDataTestID);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInputDataTestID);
    toBeInTheDocumentAll([searchInput]);
    userEvent.type(searchInput, searchTextTest);
  });
});
