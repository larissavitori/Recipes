import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider value={ LoginState }>
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
