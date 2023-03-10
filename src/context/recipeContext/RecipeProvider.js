import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from './RecipeContext';
import { getMealDetails, getDrinkDetails } from '../../service/api';
import { formatRecipeDetail } from '../../utils';

function RecipeProvider({ children }) {
  const { location: { pathname } } = useHistory();
  const [recipeDetail, setRecipeDetail] = useState({
    idRecipe: '',
    strRecipe: '',
    strCategory: '',
    strRecipeThumb: '',
    strArea: '',
    strAlcoholic: '',
    ingredientsAndMeasures: {
      ingredients: [],
      measures: [],
    },
    strInstructions: '',
    strYoutube: '',
  });
  const [isInProgressRecipes, setIsInProgressRecipes] = useState(false);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);

  const handleGetRecipe = async (dataBase, id) => {
    let recipe = {};
    if (dataBase === 'meals') {
      recipe = formatRecipeDetail(await getMealDetails(id));
    } else {
      recipe = formatRecipeDetail(await getDrinkDetails(id));
    }
    setRecipeDetail(recipe);
  };

  useEffect(() => {
    const { idRecipe } = recipeDetail;
    const dataBase = pathname.split('/')[1];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      meals: {},
      drinks: {},
    };
    doneRecipes.forEach((recipe) => {
      if (recipe.id === idRecipe) {
        setIsDoneRecipe(true);
      }
    });
    const { meals, drinks } = inProgressRecipes;
    if (dataBase === 'meals') {
      if (meals[idRecipe]) {
        setIsInProgressRecipes(true);
      }
    } else if (drinks[idRecipe]) {
      setIsInProgressRecipes(true);
    }
  }, [pathname, recipeDetail.idRecipe]);

  const recipeState = useMemo(() => ({
    recipeDetail,
    isInProgressRecipes,
    isDoneRecipe,
    handleGetRecipe,
  }), [recipeDetail, isInProgressRecipes, isDoneRecipe]);

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
