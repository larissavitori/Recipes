import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { GiHotMeal } from 'react-icons/gi';
import { RecipeContext } from '../../context';

function RecipeDetailsHeader() {
  const { recipeDetail: {
    strRecipeThumb,
    strRecipe,
    strCategory,
    strAlcoholic,
    strArea,
  } } = useContext(RecipeContext);
  const { location: { pathname } } = useHistory();
  const dataBase = pathname.split('/')[1];

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
            <hr />
            {strAlcoholic ? <p className="tag-item">{strAlcoholic}</p> : '' }
            {strArea ? <p className="tag-item">{strArea}</p> : '' }
          </span>
        </div>
        <div className="detail-options" />
      </div>
      <h1 data-testid="recipe-title">
        {strRecipe}
      </h1>
    </div>
  );
}

export default RecipeDetailsHeader;
