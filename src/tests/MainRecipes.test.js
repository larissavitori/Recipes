import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Drinks, Meals } from '../pages';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test Application Footer Component', () => {
  it('General tests', async () => {
    renderWithRouter(<Drinks />);
    await waitFor(() => {
      const categoriesButton = screen.getAllByRole('button');
      expect(categoriesButton.length).toBe(10);
      fireEvent.click(categoriesButton[2]);
      fireEvent.click(categoriesButton[7]);
      fireEvent.click(categoriesButton[2]);
      fireEvent.click(categoriesButton[2]);
      expect(categoriesButton.length).toBe(9);
    }, { timeout: 4000 });
  });

  it('General tests', async () => {
    renderWithRouter(<Meals />);
    await waitFor(() => {
      const categoriesButton = screen.getAllByRole('button');
      expect(categoriesButton.length).toBe(10);
      fireEvent.click(categoriesButton[2]);
      fireEvent.click(categoriesButton[7]);
      fireEvent.click(categoriesButton[2]);
      fireEvent.click(categoriesButton[2]);
      expect(categoriesButton.length).toBe(9);
    }, { timeout: 4000 });
  });
});
