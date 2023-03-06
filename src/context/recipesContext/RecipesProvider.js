import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';

import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [research, setResearch] = useState({
    search: '',
    searchOption: 'byIngredient',
    dataBase: 'meals',
  });

  const researchHandleChange = ({ target: { name, value } }) => {
    setResearch({ ...research, [name]: value });
  };

  const setDataBase = (dataBase) => {
    setResearch({ ...research, dataBase });
  };

  const recipesState = useMemo(() => ({
    research,
    researchHandleChange,
    setDataBase,
  }), [research, setDataBase]);

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
