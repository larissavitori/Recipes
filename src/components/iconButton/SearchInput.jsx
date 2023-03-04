import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Input from '../inputs/Input';

function SearchInput() {
  const [search, setSearch] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setSearch({ [name]: value });
  };

  return (
    <Input
      iType="text"
      iName="search"
      iPlaceholder="Research"
      iDataTestId="search-input"
      iValue={ search }
      iOnChange={ handleChange }
    >
      <FaSearch />
    </Input>
  );
}

export default SearchInput;
