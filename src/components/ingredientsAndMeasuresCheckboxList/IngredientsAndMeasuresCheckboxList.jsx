import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ingredientsAndMeasuresCheckboxList.css';

function IngredientsAndMeasuresCheckboxList({ ingredients, measures }) {
  const [isChecked, setIsChecked] = useState([]);
  console.log(isChecked);

  const handleCheckBox = ({ target: { name } }) => {
    setIsChecked((prev) => ([...prev, name]));
  };

  return (
    <ul className="ing-list list-style-none">
      {
        ingredients.map((ingredient, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={
                isChecked.includes(ingredient) ? 'list-line scratched' : 'list-line'
              }
            >
              <input
                id={ index }
                name={ ingredient }
                onChange={ handleCheckBox }
                type="checkbox"
                checked={ isChecked.includes(ingredient) }
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
