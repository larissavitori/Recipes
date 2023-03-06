export const getDrinksByIngredient = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await (await fetch(URL)).json();

  return drinks;
};

export const getDrinksByName = async (name) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const { drinks } = await (await fetch(URL)).json();

  return drinks;
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { drinks } = await (await fetch(URL)).json();

  return drinks;
};

export const getDrinksCategoryList = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks: categories } = await (await fetch(URL)).json();

  return categories;
};

export const getMealsByIngredient = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await (await fetch(URL)).json();

  return meals;
};

export const getMealsByName = async (name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const { meals } = await (await fetch(URL)).json();

  return meals;
};

export const getMealsByFirstLetter = async (firstLetter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { meals } = await (await fetch(URL)).json();

  return meals;
};

export const getMealsCategoryList = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const { categories } = await (await fetch(URL)).json();

  return categories;
};
