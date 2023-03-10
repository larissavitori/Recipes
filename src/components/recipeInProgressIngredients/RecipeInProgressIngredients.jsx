import React, { useContext } from 'react';
import { RecipeContext } from '../../context';

function RecipeInProgressIngredients() {
  const { recipeDetail: {
    ingredientsAndMeasures: { ingredients, measures },
  } } = useContext(RecipeContext);

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
              />
              {ingredient}
              {' - '}
              {measures[index]}
            </label>
          ))
        }
      </ul>
    </div>
  );
}

export default RecipeInProgressIngredients;
