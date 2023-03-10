import PropTypes from 'prop-types';
import React from 'react';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FavoriteBtn({ isFavorite, fHandleClick }) {
  return (
    <button
      className="option-btn"
      onClick={ fHandleClick }
    >
      {
        isFavorite ? <img
          src={ blackHeartIcon }
          alt="Favorited Icon"
          className="option-icon"
          data-testid="favorite-btn"
        /> : <img
          className="option-icon"
          src={ whiteHeartIcon }
          alt="Unfavorite Icon"
          data-testid="favorite-btn"
        />
      }
    </button>
  );
}

FavoriteBtn.propTypes = {
  fHandleClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default FavoriteBtn;
