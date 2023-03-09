const formatRecipeDetail = ({
  idMeal, idDrink,
  strMeal, strDrink,
  strCategory, // both
  strMealThumb, strDrinkThumb,
  strArea, // meal
  strAlcoholic, // drink
}) => ({
  idRecipe: idMeal || idDrink,
  strRecipe: strMeal || strDrink,
  strCategory,
  strRecipeThumb: strMealThumb || strDrinkThumb,
  strArea: strArea || '',
  strAlcoholic: strAlcoholic || '',
});

export default formatRecipeDetail;
