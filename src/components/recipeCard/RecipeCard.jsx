import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './recipeCard.css';

function RecipeCard({ recipeData, index }) {
  const { recipeId, recipeImgUrl, recipeName } = recipeData;
  const { location } = useHistory();
  return (
    <a
      href={ `${location.pathname}/${recipeId}` }
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipeImgUrl }
        alt={ `Foto: ${recipeName}` }
        className="recipe-image"
      />
      <h2
        data-testid={ `${index}-card-name` }
        className="recipe-name"
      >
        {recipeName}
      </h2>
    </a>
  );
}

RecipeCard.propTypes = {
  recipeData: PropTypes.shape({
    recipeId: PropTypes.string.isRequired,
    recipeImgUrl: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
