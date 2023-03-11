import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ingredientsAndMeasuresCheckboxList.css';

function IngredientsAndMeasuresCheckboxList({ ingredients, measures }) {
  const [isChecked, setIsChecked] = useState({});
  console.log(isChecked);

  const handleCheckBox = ({ target: { name, checked } }) => {
    setIsChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <ul className="ing-list list-style-none">
      {
        ingredients.map((ingredient, index) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              className={
                isChecked[`${index}-${ingredient}`] ? 'list-line scratched' : 'list-line'
              }
            >
              <input
                id={ index }
                name={ `${index}-${ingredient}` }
                onChange={ handleCheckBox }
                type="checkbox"
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
