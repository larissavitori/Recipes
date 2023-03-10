import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  VideoEmbed,
  RecipeDetailsHeader,
  RecipeDetailsIngredients,
  RecipeDetailsInstructions,
  RecommendedRecipes,
} from '../../components';
import Button from '../../components/buttons/Button';
import { RecipeContext, ResearchRecipesContext } from '../../context';

import './recipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [isInProgressRecipes, setIsInProgressRecipes] = useState(false);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const {
    recipeDetail: { strYoutube },
    handleGetRecipe,
  } = useContext(RecipeContext);
  const {
    handleGetRecipes: handleGetRecommendedRecipes,
  } = useContext(ResearchRecipesContext);

  useEffect(() => {
    const dataBase = history.location.pathname.split('/')[1];
    handleGetRecipe(dataBase, id);
    if (dataBase === 'meals') { handleGetRecommendedRecipes('drinks'); }
    if (dataBase === 'drinks') { handleGetRecommendedRecipes('meals'); }
  }, [history.location.pathname, id]);

  const handleClickToStartRecipe = () => {
    const { pathname } = history.location;
    history.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    const dataBase = history.location.pathname.split('/')[1];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      meals: {},
      drinks: {},
    };
    doneRecipes.forEach((recipe) => {
      if (recipe.id === idRecipe) {
        setIsDoneRecipe(true);
      }
    });
    const { meals, drinks } = inProgressRecipes;
    if (dataBase === 'meals') {
      if (meals[idRecipe]) {
        setIsInProgressRecipes(true);
      }
    } else if (drinks[idRecipe]) {
      setIsInProgressRecipes(true);
    }
  }, [history.location.pathname, idRecipe]);

  // const [favorited, setFavorited] = useState(false);
  // const [fav, setFav] = useState([]);

  // const newMeal = useMemo(() => ({
  //   id: mealDetail.length > 0 ? mealDetail[0].idMeal : null,
  //   type: 'meal',
  //   nationality: mealDetail.length > 0 ? mealDetail[0].strArea : null,
  //   category: mealDetail.length > 0 ? mealDetail[0].strCategory : null,
  //   alcoholicOrNot: '',
  //   name: mealDetail.length > 0 ? mealDetail[0].strMeal : null,
  //   image: mealDetail.length > 0 ? mealDetail[0].strMealThumb : null,
  // }), [mealDetail]);

  // const newDrink = useMemo(() => ({
  //   id: drinkDetail.length > 0 ? drinkDetail[0].idDrink : null,
  //   type: 'drink',
  //   nationality: '',
  //   category: drinkDetail.length > 0 ? drinkDetail[0].strCategory : null,
  //   alcoholicOrNot: drinkDetail.length > 0 ? drinkDetail[0].strAlcoholic : null,
  //   name: drinkDetail.length > 0 ? drinkDetail[0].strDrink : null,
  //   image: drinkDetail.length > 0 ? drinkDetail[0].strDrinkThumb : null,
  // }), [drinkDetail]);

  // const newDrinkOrMeal = useCallback(() => {
  //   if (drinkOrMeal.includes('drinks')) {
  //     return newDrink;
  //   }
  //   return newMeal;
  // }, [drinkOrMeal, newDrink, newMeal]);

  // const vitao = useCallback(() => {
  //   const bebidasSalvas = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  //   const index = bebidasSalvas.some((item) => item.id === id);
  //   setFav(bebidasSalvas);
  //   setFavorited(index);
  // }, [id]);

  // useEffect(() => {
  //   vitao();
  // }, [vitao]);

  // const salvarNoLocalStorage = useCallback(() => {
  //   // const bebidasSalvas = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  //   if (favorited) {
  //     const updatedItens = fav
  //       .filter((item) => item.id !== id);
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(updatedItens));
  //   } else {
  //     const filtroDrinkOrMeal = [...fav, newDrinkOrMeal()];
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(filtroDrinkOrMeal));
  //   }
  //   setFavorited((prev) => !prev);
  // }, [favorited, newDrinkOrMeal, fav, id]);

  // const handleClickFavorite = () => {
  //   salvarNoLocalStorage();
  // };

  return (
    <div className="recipe-details-page">
      <RecipeDetailsHeader />
      <RecipeDetailsIngredients />
      <RecipeDetailsInstructions />
      { strYoutube ? <VideoEmbed /> : '' }
      <RecommendedRecipes />
      { isDoneRecipe ? '' : <Button
        bDataTestId="start-recipe-btn"
        bHandleClick={ handleClickToStartRecipe }
        bTitle={ isInProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }
        bClassName="start-recipe-btn"
      />}
    </div>
  );
}

export default RecipeDetails;
