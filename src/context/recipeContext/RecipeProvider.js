import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeContext from './RecipeContext';
import { getMealDetails, getDrinkDetails } from '../../service/api';
import { formatRecipeDetail } from '../../utils';

function RecipeProvider({ children }) {
  const { pathname } = useLocation();
  const { push } = useHistory();
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
    strTags: [],
  });

  const [isInProgressRecipes, setIsInProgressRecipes] = useState(false);
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAproveToDone, setIsAproveToDone] = useState(false);
  const [usedIngredients, setUsedIngredients] = useState([]);

  const saveIngredientsInDatabase = (recipeId) => {
    const dataBase = pathname.split('/')[1];
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [dataBase]: {
        ...inProgressRecipes[dataBase],
        [recipeId]: usedIngredients,
      },
    }));
  };

  const handleDoneRecipe = () => {
    const dataBase = pathname.split('/')[1];
    const {
      idRecipe,
      strArea,
      strCategory,
      strAlcoholic,
      strRecipe,
      strRecipeThumb,
      strTags,
    } = recipeDetail;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([
      ...doneRecipes,
      {
        id: idRecipe,
        type: dataBase === 'meals' ? 'meal' : 'drink',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strRecipe,
        image: strRecipeThumb,
        doneDate: new Date(),
        tags: strTags,
      },
    ]));

    push('/done-recipes');
  };

  const handleCheckBox = ({ target: { name, checked } }) => {
    if (checked) {
      setUsedIngredients((prev) => ([...prev, name]));
    } else {
      setUsedIngredients((prev) => {
        const filtered = prev.filter((item) => item !== name);
        return filtered;
      });
    }
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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        drinks: {},
      }));
    }
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (pathname.split('/')[3] === 'in-progress') {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const dataBase = pathname.split('/')[1];
      setUsedIngredients(inProgressRecipes[dataBase][recipeDetail.idRecipe] || []);
    }
  }, [isInProgressRecipes, recipeDetail.idRecipe, pathname]);

  useEffect(() => {
    const { idRecipe } = recipeDetail;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === idRecipe));
  }, [recipeDetail]);

  useEffect(() => {
    const { ingredients } = recipeDetail.ingredientsAndMeasures;
    setIsAproveToDone(usedIngredients.length === ingredients.length);
  }, [recipeDetail.ingredientsAndMeasures, usedIngredients]);

  useEffect(() => {
    const { idRecipe } = recipeDetail;
    const dataBase = pathname.split('/')[1];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    doneRecipes.forEach((recipe) => {
      if (recipe.id === idRecipe) {
        setIsDoneRecipe(true);
      }
    });
    const { meals, drinks } = inProgressRecipes;
    if (dataBase === 'meals') {
      if (meals && meals[idRecipe]) {
        setIsInProgressRecipes(true);
      }
    } else if (drinks && drinks[idRecipe]) {
      setIsInProgressRecipes(true);
    }
  }, [pathname, recipeDetail.idRecipe]);

  const recipeState = useMemo(() => ({
    recipeDetail,
    isFavorite,
    isInProgressRecipes,
    isDoneRecipe,
    isAproveToDone,
    usedIngredients,
    handleGetRecipe,
    handleFavorite,
    handleUnfavorite,
    handleCheckBox,
    handleDoneRecipe,
    saveIngredientsInDatabase,
  }), [
    recipeDetail, isInProgressRecipes, isDoneRecipe, isFavorite, usedIngredients,
    isAproveToDone,
  ]);

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
