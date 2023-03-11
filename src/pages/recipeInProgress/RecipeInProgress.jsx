import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  RecipeHeader,
  RecipeInProgressIngredients,
  RecipeInstructions,
} from '../../components';
import { RecipeContext } from '../../context';

function RecipeInProgress() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const {
    handleGetRecipe,
  } = useContext(RecipeContext);

  useEffect(() => {
    const dataBase = pathname.split('/')[1];
    handleGetRecipe(dataBase, id);
  }, [pathname, id]);

  return (
    <div>
      <RecipeHeader />
      <RecipeInProgressIngredients />
      <RecipeInstructions />
      <button data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

export default RecipeInProgress;
