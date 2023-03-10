import React, { useState, useContext } from 'react';
import { RecipeContext } from '../../context';

import './recipeInProgressIngredients.css';

function RecipeInProgressIngredients() {
  const { recipeDetail: {
    ingredientsAndMeasures: { ingredients, measures },
  } } = useContext(RecipeContext);

  const [isChecked, setIsChecked] = useState({});
  console.log(isChecked);

  const handleCheckBox = ({ target: { name, checked } }) => {
    setIsChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ isChecked[ingredient] ? 'riscado' : 'normal' }
            >
              <p>
                <input
                  id={ index }
                  name={ ingredient }
                  onChange={ handleCheckBox }
                  type="checkbox"
                />
                {ingredient}
                {' - '}
                {measures[index]}
              </p>
            </label>
          ))
        }
      </ul>
    </div>
  );
}

export default RecipeInProgressIngredients;
