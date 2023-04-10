import { formatRecipeList } from '../utils';

const TWELVE = 12;
const FIVE = 5;
const MESSAGE_ERROR = 'Sorry, we haven\'t found any recipes for these filters.';

export const getDrinksByIngredient = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(drinks.slice(0, TWELVE), 'drinks');
};

export const getDrinksByName = async (name = '') => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(drinks.slice(0, TWELVE), 'drinks');
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(drinks.slice(0, TWELVE), 'drinks');
};

export const getDrinksByCategory = async (category) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(drinks.slice(0, TWELVE), 'drinks');
};

export const getDrinksCategoryList = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks: categories } = await (await fetch(URL)).json();

  return categories.slice(0, FIVE);
};

export const getDrinkDetails = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks: drink } = await (await fetch(URL)).json();

  return drink[0];
};

export const getMealsByIngredient = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(meals.slice(0, TWELVE), 'meals');
};

export const getMealsByName = async (name = '') => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(meals.slice(0, TWELVE), 'meals');
};

export const getMealsByFirstLetter = async (firstLetter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(meals.slice(0, TWELVE), 'meals');
};

export const getMealsByCategory = async (category) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    global.alert(MESSAGE_ERROR);
    return [];
  }

  return formatRecipeList(meals.slice(0, TWELVE), 'meals');
};

export const getMealsCategoryList = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals: categories } = await (await fetch(URL)).json();

  return categories.slice(0, FIVE);
};

export const getMealDetails = async (id) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals: meal } = await (await fetch(URL)).json();

  return meal[0];
};
