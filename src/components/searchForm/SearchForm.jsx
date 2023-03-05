import React, { useState } from 'react';
import SearchInput from '../inputs/SearchInput';
import RadioInputs from '../inputs/RadioInputs';
import Button from '../buttons/Button';

import './searchForm.css';

function SearchForm() {
  const [research, setResearch] = useState({
    search: '',
    searchOption: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setResearch({ [name]: value });
  };

  const rData = [
    {
      rDataTestId: 'ingredient-search-radio',
      rTitle: 'Ingredient',
    },
    {
      rDataTestId: 'name-search-radio',
      rTitle: 'Name',
    },
    {
      rDataTestId: 'first-letter-search-radio',
      rTitle: 'First Letter',
    },
  ];

  return (
    <div className="research-form">
      <SearchInput sValue={ research.search } sHandleChange={ handleChange } />
      <RadioInputs rData={ rData } rName="searchOption" rHandleChange={ handleChange } />
      <Button
        bDataTestId="exec-search-btn"
        bHandleClick={ () => alert('Searching...') }
        bTitle="Search"
      />
    </div>
  );
}

export default SearchForm;
