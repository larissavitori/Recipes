import React, { useContext, useEffect, useState } from 'react';
import { ResearchRecipesContext } from '../../context';
import RecipeCard from '../recipeCard/RecipeCard';

import './recommendedRecipes.css';

function RecommendedRecipes() {
  const WIDTH_SIX = 6;
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const {
    recipes,
  } = useContext(ResearchRecipesContext);

  useEffect(() => {
    setRecommendedRecipes(recipes.slice(0, WIDTH_SIX));
  }, [recipes]);

  return (
    <div className="recommended-component">
      <h2 className="details-sub-title">Recommended Recipes</h2>
      <div className="recommended-recipes">
        {recommendedRecipes?.map((recipe, id) => (
          <RecipeCard
            key={ id }
            recipeData={ recipe }
            index={ id }
            altTestIdCard="-recommendation-card"
            altTestIdTitle="-recommendation-title"
            altClass="recommended-card"
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedRecipes;
