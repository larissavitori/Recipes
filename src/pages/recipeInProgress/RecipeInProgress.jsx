import React, {
  useContext, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  RecipeInProgressHeader,
  RecipeInProgressIngredients,
  RecipeInProgressInstructions,
} from '../../components';
import { RecipeContext, ResearchRecipesContext } from '../../context';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const {
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

  return (
    <div className="recipe-details-page">
      <RecipeInProgressHeader />
      <RecipeInProgressIngredients />
      <RecipeInProgressInstructions />
      <button data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

export default RecipeInProgress;

// import React, { useContext } from 'react';
// import FavoriteBtn from '../../components/buttons/FavoriteBtn';
// import { RecipeContext } from '../../context';

// function RecipeInProgress() {
//   const {
//     recipeDetail: {
//       strRecipeThumb,
//       strRecipe,
//       strCategory,
//       strAlcoholic,
//       strArea,
//       ingredientsAndMeasures: {
//         ingredients,
//         measures,
//       },
//     },
//     isFavorite,
//     handleFavorite,
//     handleUnfavorite,
//   } = useContext(RecipeContext);
//   return (

//     <div>
//       <img
//         src={ strRecipeThumb }
//         alt={ `Imagem: ${strRecipe}` }
//         data-testid="recipe-photo"
//       />
//       <h1 data-testid="recipe-title">{strRecipe}</h1>
//       <button data-testid="share-btn"> </button>
//       {
//         isFavorite ? <FavoriteBtn
//           fHandleClick={ handleUnfavorite }
//           isFavorite={ isFavorite }
//           data-testid="favorite-btn"
//         /> : <FavoriteBtn
//           fHandleClick={ handleFavorite }
//           isFavorite={ isFavorite }
//           data-testid="favorite-btn"
//         />
//       }
//       <div data-testid="recipe-category">{strCategory}</div>
//       {strAlcoholic ? <p>{strAlcoholic}</p> : ''}
//       {strArea ? <p>{strArea}</p> : ''}
//       <div data-testid="instructions">
//         {
//           ingredients.map((ingredient, index) => (
//             <label
//               key={ index }
//               data-testid={ `${index}-ingredient-step` }
//             >
//               <input
//                 type="checkbox"
//               />
//               {ingredient}
//               {' - '}
//               {measures[index]}
//             </label>
//           ))
//         }
//       </div>
//       <button data-testid="finish-recipe-btn"> </button>
//     </div>
//   );
// }

// export default RecipeInProgress;
