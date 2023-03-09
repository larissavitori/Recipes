import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../buttons/Button';
import { getDrinksCategoryList, getMealsCategoryList } from '../../service/api';
import { ResearchRecipesContext } from '../../context';

import './categoryList.css';

function CategoryList() {
  const {
    searchBarStatus, handleGetRecipesByCategory, handleGetRecipes,
  } = useContext(ResearchRecipesContext);
  const { location: { pathname } } = useHistory();
  const [categories, setCategories] = useState([]);

  const handleSetCategory = (categoryList) => {
    setCategories(categoryList);
  };

  useEffect(() => {
    async function fetchMealsCategoriesList() {
      const fetchData = await getMealsCategoryList();
      handleSetCategory(fetchData);
    }

    async function fetchDrinksCategoriesList() {
      const fetchData = await getDrinksCategoryList();
      handleSetCategory(fetchData);
    }

    if (pathname === '/meals') {
      fetchMealsCategoriesList();
    } else fetchDrinksCategoriesList();
  }, [pathname]);

  return (
    <div className={ searchBarStatus ? 'category-list search-open' : 'category-list' }>
      {
        categories.map(({ strCategory }, index) => (
          <Button
            key={ index }
            bDataTestId={ `${strCategory}-category-filter` }
            bHandleClick={ handleGetRecipesByCategory }
            bTitle={ strCategory }
            bClassName="category-btn"
          />
        ))
      }
      <Button
        bDataTestId="All-category-filter"
        bHandleClick={ () => handleGetRecipes(pathname.slice(1)) }
        bTitle="All"
        bClassName="category-btn"
      />
    </div>
  );
}

export default CategoryList;
