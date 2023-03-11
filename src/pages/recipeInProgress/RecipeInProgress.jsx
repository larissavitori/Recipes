import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  RecipeHeader,
  RecipeIngredients,
  RecipeInstructions,
} from '../../components';
import Button from '../../components/buttons/Button';
import { RecipeContext } from '../../context';

import './recipeInProgress.css';

function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const {
    handleGetRecipe,
    isAproveToDone: isDisable,
    handleDoneRecipe,
  } = useContext(RecipeContext);

  useEffect(() => {
    const dataBase = pathname.split('/')[1];
    handleGetRecipe(dataBase, id);
  }, [pathname, id]);

  return (
    <div className="recipe-inProgress-page">
      <RecipeHeader />
      <RecipeIngredients />
      <RecipeInstructions />
      <Button
        bDataTestId="finish-recipe-btn"
        bHandleClick={ handleDoneRecipe }
        bTitle="Finish Recipe"
        bClassName="finish-recipe-btn"
        bValidation={ !isDisable }
      />
    </div>
  );
}

export default RecipeInProgress;
