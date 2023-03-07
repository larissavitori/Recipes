import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import Footer from '../../components/footer/Footer';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinkCategorieFilter, setDrinkCategorieFilter] = useState([]);
  const [drinksByCategory, setDrinksByCategory] = useState([]);
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

  const handleCategoriesClick = async ({ target: { name } }) => {
    if (name === drinkCategorieFilter) {
      setDrinksByCategory([]);
    } else {
      const twelve = 12;
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
      const data = await response.json();
      const twelveItensfromACategory = data.drinks.slice(0, twelve);
      setDrinkCategorieFilter(name);
      setDrinksByCategory(twelveItensfromACategory);
    }
  };

  const filterByCategorie = () => {
    if (drinksByCategory.length > 0) {
      return drinksByCategory;
    }
    return drinks;
  };

  return (
    <div>
      <Header hTitle="Drinks" />
      <div>
        {drinksCategories.map((dCategorie) => (
          <button
            onClick={ handleCategoriesClick }
            name={ dCategorie.strCategory }
            data-testid={ `${dCategorie.strCategory}-category-filter` }
            key={ dCategorie.strCategory }
          >
            {dCategorie.strCategory}
          </button>
        ))}
      </div>
      <button
        data-testid="All-category-filter"
        onClick={ () => setDrinksByCategory([]) }
      >
        All
      </button>
      <main>
        {filterByCategorie().map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <h5 data-testid={ `${index}-card-name` }>{drink.strDrink}</h5>
            <a href={ `/drinks/${drink.idDrink}` }>
              <img
                src={ drink.strDrinkThumb }
                alt="drink-thumb"
                data-testid={ `${index}-card-img` }
              />

            </a>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
