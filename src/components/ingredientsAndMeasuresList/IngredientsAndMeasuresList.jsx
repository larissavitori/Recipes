import PropTypes from 'prop-types';
import React from 'react';

import './ingredientsAndMeasuresList.css';

function IngredientsAndMeasuresList({ ingredients, measures }) {
  return (
    <ul className="ing-list">
      {
        ingredients.map((ing, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ing}
            {' - '}
            {measures[index]}
          </li>
        ))
      }
    </ul>
  );
}

IngredientsAndMeasuresList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsAndMeasuresList;
