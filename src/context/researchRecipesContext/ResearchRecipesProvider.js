import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useSearchRecipes from '../../hooks/useSearchRecipes';
import ResearchRecipesContext from './ResearchRecipesContext';

function ResearchRecipesProvider({ children }) {
  const {
    recipes,
    research,
    searchBarStatus,
    handlerSearchBarOnOff,
    setDataBase,
    handleResearchRecipes,
    researchHandleChange,
    handleGetRecipes,
    handleGetRecipesByCategory,
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
    handleGetRecipesByCategory,
  }), [research, recipes, searchBarStatus]);

  return (
    <ResearchRecipesContext.Provider value={ recipesState }>
      {children}
    </ResearchRecipesContext.Provider>
  );
}

ResearchRecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ResearchRecipesProvider;
