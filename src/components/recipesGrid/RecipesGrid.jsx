import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../recipeCard/RecipeCard';
import { RecipesContext } from '../../context';

import './recipesGrid.css';

function RecipesGrid() {
  const {
    recipes, handleGetRecipes, setDataBase,
  } = useContext(RecipesContext);
  const history = useHistory();
  const dbName = history.location.pathname.substring(1);

  useEffect(() => {
    handleGetRecipes(dbName);
    setDataBase(dbName);
  }, [dbName]);

  return (
    <div className="recipes-grid">
      {
        recipes.map((recipeData, index) => (
          <RecipeCard index={ index } recipeData={ recipeData } key={ index } />
        ))
      }
    </div>
  );
}

export default RecipesGrid;
