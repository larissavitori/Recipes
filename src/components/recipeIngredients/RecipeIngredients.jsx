import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipeContext } from '../../context';
import IngredientsAndMeasuresList
  from '../ingredientsAndMeasuresList/IngredientsAndMeasuresList';
import IngredientsAndMeasuresCheckboxList
  from '../ingredientsAndMeasuresCheckboxList/IngredientsAndMeasuresCheckboxList';

import './recipeIngredients.css';

function RecipeIngredients() {
  const [page, setPage] = useState('');

  const { recipeDetail: {
    ingredientsAndMeasures: { ingredients, measures },
  } } = useContext(RecipeContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setPage(pathname.split('/')[3] || 'details');
  }, [pathname]);

  return (
    <div className="details-ingredients-component">
      <h2 className="details-sub-title">Ingredients</h2>
      {
        page === 'in-progress' ? <IngredientsAndMeasuresCheckboxList
          ingredients={ ingredients }
          measures={ measures }
        /> : <IngredientsAndMeasuresList
          ingredients={ ingredients }
          measures={ measures }
        />
      }
    </div>
  );
}

export default RecipeIngredients;
