import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteBtn from '../buttons/FavoriteBtn';
import NotificationAlert from '../notificationAlert/NotificationAlert';

function DoneRecipeCard({ recipeData, index }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const { push } = useHistory();

  const handleRedirectToDetail = () => {
    const { id, type } = recipeData;
    push(`/${type}s/${id}`);
  };

  const handleShare = async () => {
    let url = window.location.href;
    const { type, id } = recipeData;
    const urlParms = type === 'meal' ? `meals/${id}` : `drinks/${id}`;

    url = url.replace('done-recipes', urlParms);

    await clipboardCopy(url);
    setIsShare(true);
  };

  const closeAlert = async () => {
    setIsShare(false);
  };

  const handleFavorite = () => {
    const {
      id, type, nationality, category, alcoholicOrNot, name, image,
    } = recipeData;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteData = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };

    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...favoriteRecipes,
      favoriteData,
    ]));

    setIsFavorite(true);
  };

  const handleUnfavorite = () => {
    const { id } = recipeData;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filteredFavorites = favoriteRecipes.filter(
      (recipe) => (recipe.id !== id),
    );

    localStorage.setItem('favoriteRecipes', JSON.stringify([...filteredFavorites]));

    setIsFavorite(false);
  };

  useEffect(() => {
    const { id } = recipeData;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
  }, []);

  return (
    <div className="done-recipe-card">
      <button onClick={ handleRedirectToDetail }>
        <img
          data-testid={ `${index}-horizontal-image` }
          className="done-recipe-image"
          src={ recipeData.image }
          alt={ `${recipeData.name}` }
        />
      </button>
      {
        isShare ? <NotificationAlert aOnClick={ closeAlert } /> : ''
      }
      <div className="detail-options">
        <button
          className="option-btn"
          onClick={ handleShare }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Icon"
          />
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
      <span
        data-testid={ `${index}-horizontal-top-text` }
        className="recipe-category"
      >
        {
          recipeData.type === 'meal' ? recipeData.nationality : recipeData.alcoholicOrNot
        }
        {' - '}
        {recipeData.category}
      </span>
      <button onClick={ handleRedirectToDetail }>
        <span
          data-testid={ `${index}-horizontal-name` }
          className="done-recipe-name"
        >
          {recipeData.name}
        </span>
      </button>
      <p
        className="done-recipe-date"
        data-testid={ `${index}-horizontal-done-date` }
      >
        {recipeData.doneDate}
      </p>
      <p className="recipe-tags">
        Tags:
        {
          recipeData.tags.map((tag, id) => (
            <span
              key={ id }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))
        }
      </p>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipeData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DoneRecipeCard;
