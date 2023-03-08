import React, { useContext } from 'react';
import SearchInput from '../inputs/SearchInput';
import RadioInputs from '../inputs/RadioInputs';
import Button from '../buttons/Button';
import { RecipesContext } from '../../context';

import './searchForm.css';

function SearchForm() {
  const rData = [
    {
      rDataTestId: 'ingredient-search-radio',
      rTitle: 'Ingredient',
      rValue: 'byIngredient',
    },
    {
      rDataTestId: 'name-search-radio',
      rTitle: 'Name',
      rValue: 'byName',
    },
    {
      rDataTestId: 'first-letter-search-radio',
      rTitle: 'First Letter',
      rValue: 'byFirstLetter',
    },
  ];
  const {
    research: { search, searchOption },
    researchHandleChange, handleResearchRecipes,
  } = useContext(RecipesContext);

  return (
    <div className="research-form">
      <SearchInput
        sValue={ search }
        sHandleChange={ researchHandleChange }
      />
      <RadioInputs
        rData={ rData }
        rName="searchOption"
        rHandleChange={ researchHandleChange }
        rSelectedValue={ searchOption }
      />
      <Button
        bDataTestId="exec-search-btn"
        bTitle="Search"
        bHandleClick={ handleResearchRecipes }
        bClassName="search-btn"
      />
    </div>
  );
}

export default SearchForm;
