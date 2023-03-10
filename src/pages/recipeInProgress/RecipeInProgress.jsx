import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  RecipeDetailsHeader,
  RecipeInProgressIngredients,
  RecipeDetailsInstructions,
} from '../../components';
import { RecipeContext, ResearchRecipesContext } from '../../context';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const {
    handleGetRecipe,
  } = useContext(RecipeContext);
  const {
    handleGetRecipes: handleGetRecommendedRecipes,
  } = useContext(ResearchRecipesContext);

  useEffect(() => {
    const dataBase = history.location.pathname.split('/')[1];
    handleGetRecipe(dataBase, id);
    if (dataBase === 'meals') { handleGetRecommendedRecipes('drinks'); }
    if (dataBase === 'drinks') { handleGetRecommendedRecipes('meals'); }
  }, [history.location.pathname, id]);

  return (
    <div>
      <RecipeDetailsHeader />
      <RecipeInProgressIngredients />
      <RecipeDetailsInstructions />
      <button data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

export default RecipeInProgress;
