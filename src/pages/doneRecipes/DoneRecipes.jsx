import React, { useState, useEffect } from 'react';
import { Header, CategoryList, DoneRecipeCard } from '../../components';

function DoneRecipes() {
  const [categories, setCategories] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredBy, setFilteredBy] = useState('all');

  const handleGetDoneRecipes = () => {
    const doneRecipesData = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(doneRecipesData);
  };

  const handleGetDoneRecipesByCategory = ({ target: { name: category } }) => {
    if (filteredBy === category) {
      handleGetDoneRecipes();
      setFilteredBy('all');
      return;
    }
    const doneRecipesData = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filteredByTermRecipes = doneRecipesData.filter(
      (recipe) => recipe.type === category,
    );
    setDoneRecipes(filteredByTermRecipes);
    setFilteredBy(category);
  };

  useEffect(() => {
    setCategories([
      { strCategory: 'meal', categoryTestId: 'filter-by-meal-btn' },
      { strCategory: 'drink', categoryTestId: 'filter-by-drink-btn' },
    ]);
    handleGetDoneRecipes();
  }, []);

  return (
    <div>
      <Header hTitle="Done Recipes" hSearchDisabled />
      <CategoryList
        categoriesList={ categories }
        handleGetAll={ handleGetDoneRecipes }
        handleGetByCategory={ handleGetDoneRecipesByCategory }
        allCategoryTestId="filter-by-all-btn"
      />
      <div className="done-recipes">
        {doneRecipes.map((recipes, index) => (
          <DoneRecipeCard
            key={ index }
            index={ index }
            recipeData={ recipes }
          />
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
