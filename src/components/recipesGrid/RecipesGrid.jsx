import React, { useContext } from 'react';
import RecipeCard from '../recipeCard/RecipeCard';
import { RecipesContext } from '../../context';

import './recipesGrid.css';

function RecipesGrid() {
  const { recipes, searchBarStatus } = useContext(RecipesContext);

  return (
    <div className={ searchBarStatus ? 'recipes-grid search-open' : 'recipes-grid' }>
      {
        recipes.map((recipeData, index) => (
          <RecipeCard index={ index } recipeData={ recipeData } key={ index } />
        ))
      }
    </div>
  );
}

export default RecipesGrid;
