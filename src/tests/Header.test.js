import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { logInTheApplication, toBeInTheDocumentAll, navigateToProfile } from './helpers/helperFunctions';
import { HEADER_COMPONENT_DATA } from './helpers/constants';
import mockCategory from './helpers/mockCategory.json';
import mockFetch from './helpers/mockFetch';

describe('Test Application Header Component', () => {
  beforeEach(() => {
    mockFetch(mockCategory);

    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('does fetch correctly in each category', () => {
    const {
      searchBtnDataTestID,
      searchInputDataTestID,
      firstLetterRadioDataTestId,
      nameRadioDataTestId,
      searchBeef,
      searchFirstLetter,
      searchFirstLetterError,
      execSearchButtonDataTestID,
    } = HEADER_COMPONENT_DATA;

    renderWithRouter(<App />);

    logInTheApplication();

    const searchBtn = screen.getByTestId(searchBtnDataTestID);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(searchInputDataTestID);
    userEvent.type(searchInput, searchBeef);
    const execSearch = screen.getByTestId(execSearchButtonDataTestID);
    userEvent.click(execSearch);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef');

    const nameRadio = screen.getByTestId(nameRadioDataTestId);
    userEvent.click(nameRadio);
    userEvent.click(execSearch);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=beef');

    const firstLetterRadio = screen.getByTestId(firstLetterRadioDataTestId);
    userEvent.click(firstLetterRadio);
    userEvent.clear(searchInput);
    userEvent.type(searchInput, searchFirstLetter);
    userEvent.click(execSearch);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=B');

    userEvent.clear(searchInput);
    userEvent.type(searchInput, searchFirstLetterError);
    userEvent.click(execSearch);
    expect(global.alert).toBeCalled();
  });
});
