import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  VideoEmbed,
  RecipeHeader,
  RecipeIngredients,
  RecipeInstructions,
  RecommendedRecipes,
} from '../../components';
import Button from '../../components/buttons/Button';
import { RecipeContext, ResearchRecipesContext } from '../../context';

import './recipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const {
    recipeDetail: { strYoutube },
    isDoneRecipe,
    isInProgressRecipes,
    handleGetRecipe,
    saveIngredientsInDatabase,
  } = useContext(RecipeContext);
  const {
    handleGetRecipes: handleGetRecommendedRecipes,
  } = useContext(ResearchRecipesContext);
  const dataBase = history.location.pathname.split('/')[1];

  useEffect(() => {
    handleGetRecipe(dataBase, id);
    if (dataBase === 'meals') { handleGetRecommendedRecipes('drinks'); }
    if (dataBase === 'drinks') { handleGetRecommendedRecipes('meals'); }
  }, [dataBase, id]);

  const handleClickToStartRecipe = () => {
    const { pathname } = history.location;
    if (!isInProgressRecipes) {
      saveIngredientsInDatabase(id);
    }
    history.push(`${pathname}/in-progress`);
  };

  return (
    <div className="recipe-details-page">
      <RecipeHeader />
      <RecipeIngredients />
      <RecipeInstructions />
      { strYoutube ? <VideoEmbed /> : '' }
      <RecommendedRecipes />
      { isDoneRecipe ? '' : <Button
        bDataTestId="start-recipe-btn"
        bHandleClick={ handleClickToStartRecipe }
        bTitle={ isInProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }
        bClassName="start-recipe-btn"
      />}
    </div>
  );
}

export default RecipeDetails;
