import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Button from '../buttons/Button';
import { ResearchRecipesContext } from '../../context';

import './categoryList.css';

function CategoryList({ categoriesList, handleGetAll, handleGetByCategory }) {
  const { searchBarStatus } = useContext(ResearchRecipesContext);

  return (
    <div className={ searchBarStatus ? 'category-list search-open' : 'category-list' }>
      {
        categoriesList.map(({ strCategory }, index) => (
          <Button
            key={ index }
            bDataTestId={ `${strCategory}-category-filter` }
            bHandleClick={ handleGetByCategory }
            bTitle={ strCategory }
            bClassName="category-btn"
          />
        ))
      }
      <Button
        bDataTestId="All-category-filter"
        bHandleClick={ handleGetAll }
        bTitle="All"
        bClassName="category-btn"
      />
    </div>
  );
}

CategoryList.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  handleGetByCategory: PropTypes.func.isRequired,
  handleGetAll: PropTypes.func.isRequired,
};

export default CategoryList;
