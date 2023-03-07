import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './recipesDetails.css';

function RecipeDetails() {
  const [mealDetail, setMealDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [recomendDrinks, setRecomendDrinks] = useState([]);
  const [recomendMeals, setRecomendMeals] = useState([]);

  const history = useHistory();
  const drinkOrMeal = history.location.pathname;
  const id = drinkOrMeal.split('/')[2];

  const inProgressRecipes = {
    drinks: {
      52771: [],
    },
  };
  async function fetchMeal() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setMealDetail(data.meals);
  }
  async function fetchDrink() {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setDrinkDetail(data.drinks);
  }
  const six = 6;
  async function carouselDrinks() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const fetchdrinks = data.drinks.slice(0, six);
    setRecomendDrinks(fetchdrinks);
  }
  async function carouselMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const fetchmeals = data.meals.slice(0, six);
    setRecomendMeals(fetchmeals);
  }

  useEffect(() => {
    if (drinkOrMeal.includes('drinks')) {
      fetchDrink();
      carouselMeals();
    } else {
      fetchMeal();
      carouselDrinks();
    }
  }, []);

  /*   const mealsOrDrinkIngredient = mealsOrDrink().map((mea) => {
    const mealWithoutEmptyValues = {};
    // const array1 = [];
    Object.entries(mea).forEach(([key, value]) => {
      if (key.includes('strIngredient') || key.includes('strMeasure')) {
        mealWithoutEmptyValues[key] = value;
        // array1.push(mealWithoutEmptyValues);
      }
    });
    console.log(mealWithoutEmptyValues);
    return mealWithoutEmptyValues;
  }); */

  const mealsOrDrink = () => {
    if (drinkOrMeal.includes('drinks')) {
      return drinkDetail;
    }
    return mealDetail;
  };
  const recomendMealsOrDrink = () => {
    if (drinkOrMeal.includes('drinks')) {
      return recomendMeals;
    }
    return recomendDrinks;
  };

  const mealWithoutEmptyValues = [];
  const mealsDrink = () => {
    mealsOrDrink().forEach((recipe) => {
      const ingredients = Object.keys(recipe).filter((k) => k
        .includes('strIngredient')).map((k) => recipe[k]);
      const measures = Object.keys(recipe).filter((k) => k
        .includes('strMeasure')).map((k) => recipe[k]);
      mealWithoutEmptyValues.push(ingredients, measures);
      return mealWithoutEmptyValues;
    });
  };
  mealsDrink();
  const handleClick = () => {
    if (!inProgressRecipes.length > 0) {
      history.push(`${drinkOrMeal}/in-progress`);
    }
    return null;
  };
  return (
    <div>
      <div>
        { recomendMealsOrDrink().map((e, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <h5 data-testid={ `${index}-recommendation-title` }>
              {e.strAlcoholic || e.strMeal }
            </h5>
          </div>
        ))}
      </div>
      <div>
        { mealsOrDrink().map((e) => (
          <div key={ e.idDrink || e.idMeal }>
            <h3 data-testid="recipe-title">
              { e.strDrink || e.strMeal }
            </h3>
            <h5 data-testid="recipe-category">
              { e.strAlcoholic || e.strCategory }
            </h5>
            <img
              data-testid="recipe-photo"
              src={ e.strDrinkThumb || e.strMealThumb }
              alt={ e.strDrink || e.strMeal }
            />
            reci
            { mealWithoutEmptyValues[0].map((objeto, index) => (
              <div key={ index }>
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {objeto}
                </p>
              </div>
            ))}
            { mealWithoutEmptyValues[1].map((objeto, index) => (
              <div key={ index }>
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {objeto}
                </p>
              </div>
            ))}
            <p data-testid="instructions">
              {e.strInstructions }
            </p>
            {(drinkOrMeal.includes('drinks')) ? ''
              : (
                <video
                  controls
                  src={ e.strYoutube }
                  data-testid="video"
                >
                  <source src={ e.strYoutube } />
                  <track
                    default
                    kind="captions"
                    srcLang="en"
                  />
                </video>
              )}
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipe"
        onClick={ handleClick }
      >
        { !inProgressRecipes.length ? 'Continue Recipe' : 'Start Recipes' }
      </button>
    </div>
  );
}

export default RecipeDetails;
