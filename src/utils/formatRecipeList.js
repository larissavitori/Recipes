const formatRecipeList = (recipesData, dataBase) => recipesData.map(({
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
  recipePath: `/${dataBase}/${idMeal || idDrink}`,
}));

export default formatRecipeList;
