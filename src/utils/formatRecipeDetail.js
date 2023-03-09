const formatRecipeDetail = (recipeData) => {
  const {
    idMeal, idDrink,
    strMeal, strDrink,
    strCategory, // both
    strMealThumb, strDrinkThumb,
    strArea, // meal
    strAlcoholic, // drink
    strInstructions, // both
    strYoutube, // meal
  } = recipeData;

  const dataIngredientKeys = Object.keys(recipeData).filter(
    (key) => key.includes('strIngredient'),
  );
  const dataMeasureKeys = Object.keys(recipeData).filter(
    (key) => key.includes('strMeasure'),
  );
  const ingredients = dataIngredientKeys.map((key) => recipeData[key]);
  const measures = dataMeasureKeys.map((key) => recipeData[key]);
  const ingredientsAndMeasures = {
    ingredients: ingredients.reduce((int, cur) => (
      cur ? [...int, cur] : [...int]
    ), []),
    measures: measures.reduce((int, cur) => (
      cur ? [...int, cur] : [...int]
    ), []),
  };

  return {
    idRecipe: idMeal || idDrink,
    strRecipe: strMeal || strDrink,
    strCategory,
    strRecipeThumb: strMealThumb || strDrinkThumb,
    strArea: strArea || '',
    strAlcoholic: strAlcoholic || '',
    ingredientsAndMeasures,
    strInstructions,
    strYoutube: strYoutube || '',
  };
};

export default formatRecipeDetail;
