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
  const history = useHistory();

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

  const handleGetRecipes = async (e) => {
    e.preventDefault();
    const { search, dataBase, searchOption } = research;
    let recipesData = recipes;
    if (dataBase === 'meals') {
      recipesData = await switchRecipesOpt(
        [getMealsByIngredient, getMealsByName, getMealsByFirstLetter],
        searchOption,
        serch,
      );
    } else {
      recipesData = await switchRecipesOpt(
        [getDrinksByIngredient, getDrinksByName, getDrinksByFirstLetter],
        searchOption,
        search,
      );
    }
    setRecipes(recipesData);
    if (recipesData.length === 1) {
      const { idMeal } = recipesData[0];
      history.push(`${dataBase}/${idMeal}`);
    }
  };

  const recipesState = useMemo(() => ({
    research,
    recipes,
    researchHandleChange,
    setDataBase,
    handleGetRecipes,
  }), [research, recipes]);

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
