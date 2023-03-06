import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { logInTheApplication, toBeInTheDocumentAll } from './helpers/helperFunctions';
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

  it('', () => {

  });
});
