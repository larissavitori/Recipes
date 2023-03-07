import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './recipeCard.css';

function RecipeCard({ recipeData, index }) {
  const { recipeId, recipeImgUrl, recipeName } = recipeData;
  const { location: { pathname } } = useHistory();
  return (
    <Link
      to={ `/${pathname}/${recipeId}` }
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
    </Link>
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
