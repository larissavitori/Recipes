import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
    researchHandleChange, setDataBase,
  } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const dataBase = pathname.slice(1);

  useEffect(() => {
    setDataBase(dataBase);
  }, [dataBase]);

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
        bHandleClick={ () => global.alert('Searching...') }
      />
    </div>
  );
}

export default SearchForm;
