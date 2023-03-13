import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Recipes, Footer, CategoryList } from '../../components';
import { getMealsCategoryList } from '../../service/api';
import { ResearchRecipesContext } from '../../context';

function Meals() {
  const [categories, setCategories] = useState([]);
  const {
    handleGetRecipesByCategory, handleGetRecipes,
  } = useContext(ResearchRecipesContext);
  const { pathname } = useLocation();

  const handleSetCategory = (categoryList) => {
    setCategories(categoryList);
  };

  useEffect(() => {
    async function fetchMealsCategoriesList() {
      const fetchData = await getMealsCategoryList();
      handleSetCategory(fetchData);
    }

    fetchMealsCategoriesList();
  }, []);

  return (
    <main className="recipes-page">
      <Header hTitle="Meals" />
      <CategoryList
        categoriesList={ categories }
        handleGetAll={ () => handleGetRecipes(pathname.slice(1)) }
        handleGetByCategory={ handleGetRecipesByCategory }
      />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Meals;
