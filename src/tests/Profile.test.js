import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Profile } from '../pages';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test Application Profile Component', () => {
  it('Testa se os Botões de redirecionamento estão na tela', () => {
    renderWithRouter(<Profile />);

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(doneRecipesButton).toBeInTheDocument();
    expect(favoriteRecipesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  it('Testa se a aplicação está na rota correta', () => {
    const { history } = renderWithRouter(<Profile />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se existe um header com o titulo Profile na tela', () => {
    renderWithRouter(<Profile />);

    const profileTitle = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(profileTitle).toBeInTheDocument();
  });
  it('Testa se a aplicação é redirecionada para a tela de drinks quando clicado no ícone de Drink ', () => {
    const { history } = renderWithRouter(<Profile />);
    const drinkIcon = screen.getByRole('img', { name: /drink-icon/i });
    userEvent.click(drinkIcon);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testa se a aplicação é redirecionada para a tela de meals quando clicado no ícone de Drink ', () => {
    const { history } = renderWithRouter(<Profile />);
    const mealIcon = screen.getByRole('img', { name: /meal-icon/i });
    userEvent.click(mealIcon);
    expect(history.location.pathname).toBe('/meals');
  });
  it('Testa se ao clicar no botão de logout, é feito o redirecionamento da aplicação para a página inicial', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
  });
  it('Testa se ao clicar no botão de Done Recipes, é feito o redirecionamento da aplicação para a página Done Recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipesButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipesButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testa se ao clicar no botão de Favorite Recipes, é feito o redirecionamento da aplicação para a página Favorites Recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoritesRecipesButton = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoritesRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
