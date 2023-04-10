import React, { useContext } from 'react';
import { RecipeContext } from '../../context';

import './recipeInstructions.css';

function RecipeInstructions() {
  const { recipeDetail: {
    strInstructions,
  } } = useContext(RecipeContext);

  return (
    <div className="details-instructions-component">
      <h2 className="details-sub-title">Instructions</h2>
      <div className="instructions-item" data-testid="instructions">
        {strInstructions}
      </div>
    </div>
  );
}

export default RecipeInstructions;
