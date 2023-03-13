import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipeContext } from '../../context';

import './ingredientsAndMeasuresCheckboxList.css';

function IngredientsAndMeasuresCheckboxList({ ingredients, measures }) {
  const {
    usedIngredients, handleCheckBox,
  } = useContext(RecipeContext);

  return (
    <ul className="ing-list list-style-none">
      {
        ingredients.map((ingredient, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={
                usedIngredients.includes(ingredient) ? 'list-line scratched' : 'list-line'
              }
            >
              <input
                id={ index }
                name={ ingredient }
                onChange={ handleCheckBox }
                type="checkbox"
                checked={ usedIngredients.includes(ingredient) }
              />
              {ingredient}
              {' - '}
              {measures[index]}
            </label>
          </li>
        ))
      }
    </ul>
  );
}

IngredientsAndMeasuresCheckboxList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsAndMeasuresCheckboxList;
