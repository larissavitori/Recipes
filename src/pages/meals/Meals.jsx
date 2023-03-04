<<<<<<< HEAD
import React from 'react';
import { Header, RecipesGrid } from '../../components';
=======
import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
>>>>>>> 7bf2ef7 (Requisito 19)
import Footer from '../../components/footer/Footer';

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const twelve = 12;
    async function fetcher() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveFromData = data.meals.slice(0, twelve);

      setMeals(twelveFromData);
    }
    fetcher();
  }, []);

  return (
    <div>
      <Header hTitle="Meals" />
<<<<<<< HEAD
      <RecipesGrid />
=======
      <main>
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
      </main>
>>>>>>> 7bf2ef7 (Requisito 19)
      <Footer />
    </div>
  );
}

export default Meals;
