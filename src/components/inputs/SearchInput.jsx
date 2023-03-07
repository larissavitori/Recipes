import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import Input from './Input';

import './input.css';

function SearchInput({ sValue, sHandleChange }) {
  return (
    <Input
      iType="text"
      iName="search"
      iPlaceholder="Research"
      iDataTestId="search-input"
      iValue={ sValue }
      iOnChange={ sHandleChange }
    >
      <FaSearch />
    </Input>
  );
}

SearchInput.propTypes = {
  sHandleChange: PropTypes.func.isRequired,
  sValue: PropTypes.string.isRequired,
};

export default SearchInput;
