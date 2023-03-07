import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
} from '../../service/api';

function RecipesProvider({ children }) {
  const [research, setResearch] = useState({
    search: '',
    searchOption: 'byIngredient',
    dataBase: 'meals',
  });
  const [recipes, setRecipes] = useState([]);
  const [searchBarStatus, setSearchBarStatus] = useState(false);

  const history = useHistory();

  const searchBarOnOff = () => {
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

  const formatRecipeData = (recipesData) => recipesData.map(({
    idMeal,
    idDrink,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
  }) => ({
    recipeId: idMeal || idDrink,
    recipeName: strMeal || strDrink,
    recipeImgUrl: strMealThumb || strDrinkThumb,
  }));

  const handleGetRecipes = async (e) => {
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
    if (recipesData.length === 1) {
      const { idMeal, idDrink } = recipesData[0];
      if (dataBase === 'meals') history.push(`${dataBase}/${idMeal}`);
      else history.push(`${dataBase}/${idDrink}`);
    }
    if (recipesData.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipesData.length > 1) setRecipes(formatRecipeData(recipesData));
  };

  const recipesState = useMemo(() => ({
    research,
    recipes,
    searchBarStatus,
    researchHandleChange,
    setDataBase,
    handleGetRecipes,
    searchBarOnOff,
  }), [research, recipes, searchBarStatus]);

  return (
    <RecipesContext.Provider value={ recipesState }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
