import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Button from '../buttons/Button';
import { ResearchRecipesContext } from '../../context';

import './categoryList.css';

function CategoryList({
  categoriesList, handleGetAll, handleGetByCategory, allCategoryTestId = null,
}) {
  const { searchBarStatus } = useContext(ResearchRecipesContext);

  return (
    <div className={ searchBarStatus ? 'category-list search-open' : 'category-list' }>
      {
        categoriesList.map(({ strCategory, categoryTestId }, index) => (
          <Button
            key={ index }
            bDataTestId={ categoryTestId || `${strCategory}-category-filter` }
            bHandleClick={ handleGetByCategory }
            bTitle={ strCategory }
            bClassName="category-btn"
          />
        ))
      }
      <Button
        bDataTestId={ allCategoryTestId || 'All-category-filter' }
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
    categoryTestId: PropTypes.string,
  }).isRequired).isRequired,
  handleGetByCategory: PropTypes.func.isRequired,
  handleGetAll: PropTypes.func.isRequired,
  allCategoryTestId: PropTypes.string,
};

export default CategoryList;
