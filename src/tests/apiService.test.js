import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import {
  getDrinksByCategory,
  getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
  getMealsByCategory,
} from '../service/api';
import mockCategory from './helpers/mockCategory.json';
import mockDataWithNull from './helpers/mockDataWithNull.json';
import mockFetch from './helpers/mockFetch';

describe('', () => {
  beforeEach(() => {
    mockFetch(mockCategory, mockDataWithNull);

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getDrinksByFirstLetter', () => {
    getDrinksByFirstLetter();
  });

  it('getDrinksByName', () => {
    getDrinksByName();
  });

  it('getDrinksByIngredient', () => {
    getDrinksByIngredient();
  });

  it('getDrinksByCategory', () => {
    getDrinksByCategory();
  });

  it('getMealsByFirstLetter', () => {
    getMealsByFirstLetter();
  });

  it('getMealsByIngredient', () => {
    getMealsByIngredient();
  });

  it('getMealsByName', () => {
    getMealsByName();
  });

  it('getMealsCategoryList', () => {
    getMealsByCategory();
  });
});
