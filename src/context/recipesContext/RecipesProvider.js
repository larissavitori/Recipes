import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useSearchRecipes from '../../hooks/useSearchRecipes';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const {
    recipes,
    research,
    searchBarStatus,
    handlerSearchBarOnOff,
    setDataBase,
    handleResearchRecipes,
    researchHandleChange,
    handleGetRecipes,
  } = useSearchRecipes();

  const recipesState = useMemo(() => ({
    research,
    recipes,
    searchBarStatus,
    researchHandleChange,
    setDataBase,
    handleResearchRecipes,
    handlerSearchBarOnOff,
    handleGetRecipes,
  }), [research, recipes, searchBarStatus]);

  return (
    <RecipesContext.Provider value={ recipesState }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
