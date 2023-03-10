import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink, BiShareAlt } from 'react-icons/bi';
import { GiHotMeal } from 'react-icons/gi';
import clipboardCopy from 'clipboard-copy';
import { RecipeContext } from '../../context';
import NotificationAlert from '../notificationAlert/NotificationAlert';
import FavoriteBtn from '../buttons/FavoriteBtn';

import './recipeDetailsHeader.css';

function RecipeDetailsHeader() {
  const [isShare, setIsShare] = useState(false);
  const {
    recipeDetail: {
      strRecipeThumb,
      strRecipe,
      strCategory,
      strAlcoholic,
      strArea,
    },
    isFavorite,
    handleFavorite,
    handleUnfavorite,
  } = useContext(RecipeContext);
  const { location: { pathname } } = useHistory();
  const dataBase = pathname.split('/')[1];

  const handleShare = async () => {
    await clipboardCopy(window.location.href);
    setIsShare(true);
  };

  const closeAlert = async () => {
    setIsShare(false);
  };

  return (
    <div className="recipe-details-header">
      <img
        className="background-header-image"
        data-testid="recipe-photo"
        src={ strRecipeThumb }
        alt={ `Imagem: ${strRecipe}` }
      />
      <div className="details-and-options">
        <div className="detail-category">
          {
            dataBase === 'meals' ? <GiHotMeal
              className="category-icon"
            /> : <BiDrink
              className="category-icon"
            />
          }
          <span data-testid="recipe-category" className="recipe-tags">
            <p className="tag-item">{strCategory}</p>
            <hr className="horizontal-line" />
            {strAlcoholic ? <p className="tag-item">{strAlcoholic}</p> : '' }
            {strArea ? <p className="tag-item">{strArea}</p> : '' }
          </span>
        </div>
        {
          isShare ? <NotificationAlert aOnClick={ closeAlert } /> : ''
        }
        <div className="detail-options">
          <button
            data-testid="share-btn"
            className="option-btn"
            onClick={ handleShare }
          >
            <BiShareAlt className="option-icon" />
          </button>
          {
            isFavorite ? <FavoriteBtn
              fHandleClick={ handleUnfavorite }
              isFavorite={ isFavorite }
            /> : <FavoriteBtn
              fHandleClick={ handleFavorite }
              isFavorite={ isFavorite }
            />
          }
        </div>
      </div>
      <h1 className="recipe-title" data-testid="recipe-title">
        {strRecipe}
      </h1>
    </div>
  );
}

export default RecipeDetailsHeader;
