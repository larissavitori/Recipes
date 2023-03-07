import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { logInTheApplication, navigateToProfile, toBeInTheDocumentAll } from './helpers/helperFunctions';
import { PROFILE_PAGE_DATA } from './helpers/constants';

describe('Test Application Profile Component', () => {
  it('Testa se os Botões de redirecionamento estão na tela', () => {
    const {
      doneRecipesButtonDataTestId,
      favoriteRecipesButtonDataTestId,
      logoutButtonDataTestId,
    } = PROFILE_PAGE_DATA;
    renderWithRouter(<App />);

    logInTheApplication();
    navigateToProfile();

    const doneRecipesButton = screen.getByTestId(doneRecipesButtonDataTestId);
    const favoriteRecipesButton = screen.getByTestId(favoriteRecipesButtonDataTestId);
    const logoutButton = screen.getByTestId(logoutButtonDataTestId);

    toBeInTheDocumentAll([doneRecipesButton, favoriteRecipesButton, logoutButton]);
  });

  it('Testa se a aplicação está na rota correta', () => {
    const { pathName } = PROFILE_PAGE_DATA;
    const { history } = renderWithRouter(<App />);

    logInTheApplication();
    navigateToProfile();

    const { pathname } = history.location;
    expect(pathname).toBe(pathName);
  });

  it('Testa se existe um header com o titulo Profile na tela', () => {
    renderWithRouter(<App />);

    logInTheApplication();
    navigateToProfile();

    const profileTitle = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(profileTitle).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de logout, é feito o redirecionamento da aplicação para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    logInTheApplication();
    navigateToProfile();
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se ao clicar no botão de Done Recipes, é feito o redirecionamento da aplicação para a página Done Recipes', () => {
    const { history } = renderWithRouter(<App />);

    logInTheApplication();
    navigateToProfile();

    const doneRecipesButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipesButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se ao clicar no botão de Favorite Recipes, é feito o redirecionamento da aplicação para a página Favorites Recipes', () => {
    const { history } = renderWithRouter(<App />);

    logInTheApplication();
    navigateToProfile();

    const favoritesRecipesButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoritesRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
