import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../recipeCard/RecipeCard';
import { ResearchRecipesContext } from '../../context';

import './recipes.css';

function RecipesGrid() {
  const {
    recipes, handleGetRecipes, setDataBase,
  } = useContext(ResearchRecipesContext);
  const { location: { pathname } } = useHistory();
  const dbName = pathname.substring(1);

  useEffect(() => {
    handleGetRecipes(dbName);
    setDataBase(dbName);
  }, [dbName]);

  return (
    <div className="recipes-grid">
      {
        recipes?.map((recipeData, index) => (
          <RecipeCard
            index={ index }
            recipeData={ recipeData }
            key={ index }
          />
        ))
      }
    </div>
  );
}

export default RecipesGrid;
