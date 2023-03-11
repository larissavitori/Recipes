import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from './RecipeContext';
import { getMealDetails, getDrinkDetails } from '../../service/api';
import { formatRecipeDetail } from '../../utils';

function RecipeProvider({ children }) {
  const { location: { pathname } } = useHistory();
  const [recipeDetail, setRecipeDetail] = useState({
    idRecipe: '',
    strRecipe: '',
    strCategory: '',
    strRecipeThumb: '',
    strArea: '',
    strAlcoholic: '',
    ingredientsAndMeasures: {
      ingredients: [],
      measures: [],
    },
    strInstructions: '',
    strYoutube: '',
  });
  const [isInProgressRecipes, setIsInProgressRecipes] = useState(false);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [usedIngredients, setUsedIngredients] = useState([]);

  const saveIngredientsInDatabase = async (recipeId) => {
    const dataBase = pathname.split('/')[1];
    const inProgressRecipes = await JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || {
      meals: {},
      drinks: {},
    };
    if (dataBase === 'meals') {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [recipeId]: usedIngredients,
        },
      }));
    }
    if (dataBase === 'drinks') {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        drinks: {
          ...inProgressRecipes.drinks,
          [recipeId]: usedIngredients,
        },
      }));
    }
  };

  const handleCheckBox = ({ target: { name } }) => {
    setUsedIngredients((prev) => ([...prev, name]));
  };

  const handleGetRecipe = async (dataBase, id) => {
    let recipe = {};
    if (dataBase === 'meals') {
      recipe = formatRecipeDetail(await getMealDetails(id));
    } else {
      recipe = formatRecipeDetail(await getDrinkDetails(id));
    }
    setRecipeDetail(recipe);
  };

  const handleFavorite = () => {
    const dataBase = pathname.split('/')[1];
    const {
      idRecipe, strArea, strCategory, strAlcoholic, strRecipe, strRecipeThumb,
    } = recipeDetail;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteData = {
      id: idRecipe,
      type: dataBase === 'meals' ? 'meal' : 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strRecipe,
      image: strRecipeThumb,
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...favoriteRecipes,
      favoriteData,
    ]));
    setIsFavorite(true);
  };

  const handleUnfavorite = () => {
    const { idRecipe } = recipeDetail;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filteredFavorites = favoriteRecipes.filter(
      (recipe) => (recipe.id !== idRecipe),
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify([...filteredFavorites]));
    setIsFavorite(false);
  };

  useEffect(() => {
    if (isInProgressRecipes) {
      const dataBase = pathname.split('/')[1];
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setUsedIngredients(inProgressRecipes[dataBase][recipeDetail.idRecipe]);
    }
  }, [isInProgressRecipes, recipeDetail.idRecipe, pathname]);

  useEffect(() => {
    if (isInProgressRecipes) { saveIngredientsInDatabase(recipeDetail.idRecipe); }
  }, [usedIngredients, recipeDetail.idRecipe, isInProgressRecipes]);

  useEffect(() => {
    const { idRecipe } = recipeDetail;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === idRecipe));
  }, [recipeDetail]);

  useEffect(() => {
    const { idRecipe } = recipeDetail;
    const dataBase = pathname.split('/')[1];
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
  }, [pathname, recipeDetail.idRecipe]);

  const recipeState = useMemo(() => ({
    recipeDetail,
    isInProgressRecipes,
    isDoneRecipe,
    isFavorite,
    usedIngredients,
    handleGetRecipe,
    handleFavorite,
    handleUnfavorite,
    handleCheckBox,
    saveIngredientsInDatabase,
  }), [recipeDetail, isInProgressRecipes, isDoneRecipe, isFavorite, usedIngredients]);

  return (
    <RecipeContext.Provider value={ recipeState }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeProvider;
