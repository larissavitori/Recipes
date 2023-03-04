import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import Footer from '../../components/footer/Footer';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  useEffect(() => {
    const twelve = 12;
    const five = 5;
    async function fetcher() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveFromData = data.drinks.slice(0, twelve);
      setDrinks(twelveFromData);
    }
    async function fetchDrinksCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const fiveCategories = data.drinks.slice(0, five);

      setDrinksCategories(fiveCategories);
    }
    fetcher();
    fetchDrinksCategories();
  }, []);

  return (
    <div>
      <Header hTitle="Drinks" />
      <div>
        {drinksCategories.map((dCategorie) => (
          <button
            data-testid={ `${dCategorie.strCategory}-category-filter` }
            key={ dCategorie.strCategory }
          >
            {dCategorie.strCategory}
          </button>
        ))}
      </div>
      <main>
        {drinks.map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
            <img
              src={ drink.strDrinkThumb }
              alt="drink-thumb"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
