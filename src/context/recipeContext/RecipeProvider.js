import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import { getMealDetails, getDrinkDetails } from '../../service/api';
import { formatRecipeDetail } from '../../utils';

function RecipeProvider({ children }) {
  const [recipeDetail, setRecipeDetail] = useState({
    idRecipe: '',
    strRecipe: '',
    strCategory: '',
    strRecipeThumb: '',
    strArea: '',
    strAlcoholic: '',
  });

  const handleGetRecipe = async (dataBase, id) => {
    let recipe = {};
    if (dataBase === 'meals') {
      recipe = formatRecipeDetail(await getMealDetails(id));
    } else {
      recipe = formatRecipeDetail(await getDrinkDetails(id));
    }
    setRecipeDetail(recipe);
  };

  const recipeState = useMemo(() => ({
    recipeDetail,
    handleGetRecipe,
  }), [recipeDetail]);

  return (
    <RecipeContext.Provider value={ recipeState }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
