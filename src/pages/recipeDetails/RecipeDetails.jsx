import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  VideoEmbed,
  RecipeDetailsHeader,
  RecipeDetailsIngredients,
  RecipeDetailsInstructions,
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

  const handleClickToStartRecipe = () => {
    const { pathname } = history.location;
    history.push(`${pathname}/in-progress`);
  };

  return (
    <div className="recipe-details-page">
      <RecipeDetailsHeader />
      <RecipeDetailsIngredients />
      <RecipeDetailsInstructions />
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
