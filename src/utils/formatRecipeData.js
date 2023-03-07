const formatRecipeData = (recipesData) => recipesData.map(({
  idMeal,
  idDrink,
  strMeal,
  strDrink,
  strMealThumb,
  strDrinkThumb,
}) => ({
  recipeId: idMeal || idDrink,
  recipeName: strMeal || strDrink,
  recipeImgUrl: strMealThumb || strDrinkThumb,
}));

export default formatRecipeData;
