import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './recipesDetails.css';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const [mealDetail, setMealDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [recomendDrinks, setRecomendDrinks] = useState([]);
  const [recomendMeals, setRecomendMeals] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [fav, setFav] = useState([]);

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

  const newMeal = useMemo(() => ({
    id: mealDetail.length > 0 ? mealDetail[0].idMeal : null,
    type: 'meal',
    nationality: mealDetail.length > 0 ? mealDetail[0].strArea : null,
    category: mealDetail.length > 0 ? mealDetail[0].strCategory : null,
    alcoholicOrNot: '',
    name: mealDetail.length > 0 ? mealDetail[0].strMeal : null,
    image: mealDetail.length > 0 ? mealDetail[0].strMealThumb : null,
  }), [mealDetail]);

  const newDrink = useMemo(() => ({
    id: drinkDetail.length > 0 ? drinkDetail[0].idDrink : null,
    type: 'drink',
    nationality: '',
    category: drinkDetail.length > 0 ? drinkDetail[0].strCategory : null,
    alcoholicOrNot: drinkDetail.length > 0 ? drinkDetail[0].strAlcoholic : null,
    name: drinkDetail.length > 0 ? drinkDetail[0].strDrink : null,
    image: drinkDetail.length > 0 ? drinkDetail[0].strDrinkThumb : null,
  }), [drinkDetail]);

  const newDrinkOrMeal = useCallback(() => {
    if (drinkOrMeal.includes('drinks')) {
      return newDrink;
    }
    return newMeal;
  }, [drinkOrMeal, newDrink, newMeal]);

  const vitao = useCallback(() => {
    const bebidasSalvas = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const index = bebidasSalvas.some((item) => item.id === id);
    setFav(bebidasSalvas);
    setFavorited(index);
  }, [id]);

  useEffect(() => {
    vitao();
  }, [vitao]);

  const salvarNoLocalStorage = useCallback(() => {
    // const bebidasSalvas = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorited) {
      const updatedItens = fav
        .filter((item) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedItens));
    } else {
      const filtroDrinkOrMeal = [...fav, newDrinkOrMeal()];
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtroDrinkOrMeal));
    }
    setFavorited((prev) => !prev);
  }, [favorited, newDrinkOrMeal, fav, id]);

  const handleClickFavorite = () => {
    salvarNoLocalStorage();
  };

  const handleCopy = async () => {
    await clipboardCopy(window.location.href);
    setCopied(true);
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
      <button type="button" onClick={ handleClickFavorite }>
        <img
          data-testid="favorite-btn"
          className="fixed-top"
          src={ favorited ? blackHeart : whiteHeartIcon }
          alt="blackHeartIcon"
        />
      </button>
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
                <p data-testid={ `${index}-ingredient-name-and-measure` }>
                  {objeto}
                </p>
              </div>
            ))}
            <p data-testid="instructions">
              {e.strInstructions }
            </p>
            {(drinkOrMeal.includes('drinks')) ? ''
              : (
                <video controls src={ e.strYoutube } data-testid="video">
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
        onClick={ handleCopy }
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
      <p>
        { copied
          && 'Link copied!' }
      </p>
    </div>
  );
}

export default RecipeDetails;
