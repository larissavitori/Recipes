import React, { useContext } from 'react';
import { RecipeContext } from '../../context';

import './recipeDetailsIngredients.css';

function RecipeDetailsIngredients() {
  const { recipeDetail: {
    ingredientsAndMeasures: { ingredients, measures },
  } } = useContext(RecipeContext);

  return (
    <div className="details-ingredients-component">
      <h2 className="details-sub-title">Ingredients</h2>
      <ul className="ing-list">
        {
          ingredients.map((ing, index) => (
            <li
              key={ index }
              className="ing-item"
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ing}
              {' - '}
              {measures[index]}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default RecipeDetailsIngredients;