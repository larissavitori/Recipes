import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import Footer from '../../components/footer/Footer';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);

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

  return (
    <div>
      <Header hTitle="Meals" />
      <main>
        <div>
          {mealsCategories.map((mcategorie) => (
            <button
              data-testid={ `${mcategorie.strCategory}-category-filter` }
              key={ mcategorie.strCategory }
            >
              {mcategorie.strCategory}
            </button>
          ))}
        </div>
        <div>
          {meals.map((meal, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
              <h5 data-testid={ `${index}-card-name` }>{meal.strMeal}</h5>
              <img
                src={ meal.strMealThumb }
                alt="meal-thumb"
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Meals;
