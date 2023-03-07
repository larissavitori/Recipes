import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import Footer from '../../components/footer/Footer';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [mealCategorieFilter, setMealCategorieFilter] = useState([]);
  const [mealsByCategory, setMealsByCategory] = useState([]);
  useEffect(() => {
    const twelve = 12;
    const five = 5;
    async function fetchMeals() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveFromData = data.meals.slice(0, twelve);

      setMeals(twelveFromData);
    }
    async function fetchMealCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const fiveCategories = data.meals.slice(0, five);

      setMealsCategories(fiveCategories);
    }
    fetchMeals();
    fetchMealCategories();
  }, []);

  const handleCategoriesClick = async ({ target: { name } }) => {
    if (name === mealCategorieFilter) {
      setMealsByCategory([]);
    } else {
      const twelve = 12;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
      const data = await response.json();
      const twelveItensfromACategory = data.meals.slice(0, twelve);
      setMealCategorieFilter(name);
      setMealsByCategory(twelveItensfromACategory);
    }
  };

  const filterByCategorie = () => {
    if (mealsByCategory.length > 0) {
      return mealsByCategory;
    }
    return meals;
  };

  return (
    <div>
      <Header hTitle="Meals" />
      <main>
        <div>
          {mealsCategories.map((mcategorie) => (
            <button
              onClick={ handleCategoriesClick }
              name={ mcategorie.strCategory }
              data-testid={ `${mcategorie.strCategory}-category-filter` }
              key={ mcategorie.strCategory }
            >
              {mcategorie.strCategory}
            </button>
          ))}
        </div>
        <button
          data-testid="All-category-filter"
          onClick={ () => setMealsByCategory([]) }
        >
          All
        </button>
        <div>
          { filterByCategorie().map((meal, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
              <h5 data-testid={ `${index}-card-name` }>{meal.strMeal}</h5>
              <a href={ `/meals/${meal.idMeal}` }>
                <img
                  src={ meal.strMealThumb }
                  alt="meal-thumb"
                  data-testid={ `${index}-card-img` }
                />
              </a>

            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Meals;
