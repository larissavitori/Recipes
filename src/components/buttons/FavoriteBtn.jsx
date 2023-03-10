import PropTypes from 'prop-types';
import React from 'react';
import { AiTwotoneHeart, AiOutlineHeart } from 'react-icons/ai';

function FavoriteBtn({ isFavorite, fHandleClick }) {
  return (
    <button
      data-testid="favorite-btn"
      className="option-btn"
      onClick={ fHandleClick }
    >
      {
        isFavorite ? <AiTwotoneHeart
          className="option-icon"
        /> : <AiOutlineHeart className="option-icon" />
      }
    </button>
  );
}

FavoriteBtn.propTypes = {
  fHandleClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default FavoriteBtn;
