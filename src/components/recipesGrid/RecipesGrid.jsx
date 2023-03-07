import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../recipeCard/RecipeCard';
import { RecipesContext } from '../../context';

import './recipesGrid.css';

function RecipesGrid() {
  const {
    recipes, searchBarStatus, handleGetRecipes,
  } = useContext(RecipesContext);
  const history = useHistory();
  const dbName = history.location.pathname.substring(1);

  useEffect(() => {
    handleGetRecipes(dbName);
  }, [dbName]);

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
