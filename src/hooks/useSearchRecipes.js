import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
  getDrinksByCategory,
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
  getMealsByCategory,
} from '../service/api';

function useSearchRecipes() {
  const [research, setResearch] = useState({
    search: '',
    searchOption: 'byIngredient',
    dataBase: 'meals',
    categoryFilter: 'all',
  });
  const [recipes, setRecipes] = useState([]);
  const [searchBarStatus, setSearchBarStatus] = useState(false);

  const history = useHistory();

  const handlerSearchBarOnOff = () => {
    setSearchBarStatus(!searchBarStatus);
  };

  const researchHandleChange = ({ target: { name, value } }) => {
    setResearch({ ...research, [name]: value });
  };

  const setDataBase = (dataBase) => {
    setResearch({ ...research, dataBase });
  };

  const switchRecipesOpt = async (
    [getByIngredient, getByName, getByFirstLetter],
    searchOption,
    search,
  ) => {
    let recipesData = recipes;
    switch (searchOption) {
    case 'byIngredient':
      recipesData = await getByIngredient(search);
      break;
    case 'byName':
      recipesData = await getByName(search);
      break;
    case 'byFirstLetter':
      if (search.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      recipesData = await getByFirstLetter(search);
      break;
    default:
      break;
    }
    return recipesData;
  };

  const handleGetRecipes = async (db) => {
    let recipesData = [];
    if (db === 'meals') {
      recipesData = await getMealsByName();
    } else {
      recipesData = await getDrinksByName();
    }
    if (recipesData.length !== 0) setRecipes(recipesData, db);
  };

  const handleGetRecipesByCategory = async ({ target: { name: category } }) => {
    const { dataBase, categoryFilter } = research;
    let recipesData = [];
    if (categoryFilter === category) {
      await handleGetRecipes(dataBase);
      setResearch({
        ...research,
        categoryFilter: 'all',
      });
      return;
    }
    if (dataBase === 'meals') {
      recipesData = await getMealsByCategory(category);
    } else {
      recipesData = await getDrinksByCategory(category);
    }
    if (recipesData.length !== 0) setRecipes(recipesData, dataBase);
    setResearch({
      ...research,
      categoryFilter: category,
    });
  };

  const handleResearchRecipes = async (e) => {
    e.preventDefault();
    const { search, dataBase, searchOption } = research;
    let recipesData = [];
    if (dataBase === 'meals') {
      recipesData = await switchRecipesOpt(
        [getMealsByIngredient, getMealsByName, getMealsByFirstLetter],
        searchOption,
        search,
      );
    } else {
      recipesData = await switchRecipesOpt(
        [getDrinksByIngredient, getDrinksByName, getDrinksByFirstLetter],
        searchOption,
        search,
      );
    }
    if (recipesData.length === 0) return;
    if (recipesData.length === 1) {
      const { recipeId } = recipesData[0];
      history.push(`${dataBase}/${recipeId}`);
    }
    setRecipes(recipesData, dataBase);
  };

  return {
    research,
    recipes,
    searchBarStatus,
    handlerSearchBarOnOff,
    researchHandleChange,
    setDataBase,
    handleResearchRecipes,
    handleGetRecipes,
    handleGetRecipesByCategory,
  };
}

export default useSearchRecipes;
