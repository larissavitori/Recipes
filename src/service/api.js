const TWELVE = 12;
const MESSAGE_ERROR = 'Sorry, we haven\'t found any recipes for these filters.';

export const getDrinksByIngredient = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    return global.alert(MESSAGE_ERROR);
  }

  return drinks.slice(0, TWELVE);
};

export const getDrinksByName = async (name) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    return global.alert(MESSAGE_ERROR);
  }

  return drinks.slice(0, TWELVE);
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { drinks } = await (await fetch(URL)).json();

  if (drinks === null) {
    return global.alert(MESSAGE_ERROR);
  }

  return drinks.slice(0, TWELVE);
};

export const getDrinksCategoryList = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks: categories } = await (await fetch(URL)).json();

  return categories;
};

export const getMealsByIngredient = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    return global.alert(MESSAGE_ERROR);
  }

  return meals.slice(0, TWELVE);
};

export const getMealsByName = async (name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    return global.alert(MESSAGE_ERROR);
  }

  return meals.slice(0, TWELVE);
};

export const getMealsByFirstLetter = async (firstLetter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { meals } = await (await fetch(URL)).json();

  if (meals === null) {
    return global.alert(MESSAGE_ERROR);
  }

  return meals.slice(0, TWELVE);
};

export const getMealsCategoryList = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const { categories } = await (await fetch(URL)).json();

  return categories;
};
