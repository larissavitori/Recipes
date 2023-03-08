import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './recipesDetails.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const [mealDetail, setMealDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [recommendDrinks, setRecommendDrinks] = useState([]);
  const [recommendMeals, setRecommendMeals] = useState([]);
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
    const fetchDrinks = data.drinks.slice(0, six);
    setRecommendDrinks(fetchDrinks);
  }
  async function carouselMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const fetchMeals = data.meals.slice(0, six);
    setRecommendMeals(fetchMeals);
  }

  useEffect(() => {
    const url = `http://localhost:3000${drinkOrMeal}`;
    setValue(url);
    if (drinkOrMeal.includes('drinks')) {
      fetchDrink();
      carouselMeals();
    } else {
      fetchMeal();
      carouselDrinks();
    }
  }, []);

  const mealsOrDrink = () => {
    if (drinkOrMeal.includes('drinks')) {
      return drinkDetail;
    }
    return mealDetail;
  };
  const recommendMealsOrDrink = () => {
    if (drinkOrMeal.includes('drinks')) {
      return recommendDrinks;
    }
    return recommendMeals;
  };

  const mealWithoutEmptyValues = [];
  const mealsDrink = () => {
    mealsOrDrink().forEach((recipe) => {
      const ingredients = Object.keys(recipe).filter((el) => el
        .includes('strIngredient')).map((el) => recipe[el]);
      const measures = Object.keys(recipe).filter((el) => el
        .includes('strMeasure')).map((el) => recipe[el]);
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
  const newMeal = [{
    id: mealDetail.length > 0 ? mealDetail[0].idMeal : null,
    type: 'meal',
    nationality: mealDetail.length > 0 ? mealDetail[0].strArea : null,
    category: mealDetail.length > 0 ? mealDetail[0].strCategory : null,
    alcoholicOrNot: '',
    name: mealDetail.length > 0 ? mealDetail[0].strMeal : null,
    image: mealDetail.length > 0 ? mealDetail[0].strMealThumb : null,
  }];
  const newDrink = [{
    id: drinkDetail.length > 0 ? drinkDetail[0].idDrink : null,
    type: 'drink',
    nationality: '',
    category: drinkDetail.length > 0 ? drinkDetail[0].strCategory : null,
    alcoholicOrNot: drinkDetail.length > 0 ? drinkDetail[0].strAlcoholic : null,
    name: drinkDetail.length > 0 ? drinkDetail[0].strDrink : null,
    image: drinkDetail.length > 0 ? drinkDetail[0].strDrinkThumb : null,
  }];
  const newDrinkOrMeal = () => {
    if (drinkOrMeal.includes('drinks')) {
      return newDrink;
    }
    return newMeal;
  };
  const salvarNoLocalStorage = () => {
    // pega o array armazenado no localStorage, se existir
    const bebidasSalvas = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const index = bebidasSalvas.filter((item) => item.id === newDrinkOrMeal().id);
    if (index) {
      const updatedItens = bebidasSalvas
        .filter((item) => item.id !== newDrinkOrMeal().id);
      setFavorited(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedItens));
    } else {
      const FiltroDrinkOrMeals = [...bebidasSalvas, newDrinkOrMeal()];
      setFavorited(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(FiltroDrinkOrMeals));
    }
  };
  const handleClickFavorite = () => {
    salvarNoLocalStorage();
  };
  return (
    <div>
      <div>
        { recommendMealsOrDrink().map((e, index) => (
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
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share" />
      </button>

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipe"
        onClick={ handleClick }
      >
        { !inProgressRecipes.length ? 'Continue Recipe' : 'Start Recipes' }
      </button>
      <button
        type="button"
        onClick={ handleClickFavorite }
      >

        <img
          data-testid="favorite-btn"
          src={ favorited ? blackHeart : whiteHeartIcon }
          alt="blackHeartIcon"
        />

      </button>
      <p>
        { copied
          ? 'Link copied!' : null }
      </p>
    </div>
  );
}

export default RecipeDetails;
