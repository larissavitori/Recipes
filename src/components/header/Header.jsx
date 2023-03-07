import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../../context';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import IconButton from '../buttons/IconButton';
import SearchForm from '../searchForm/SearchForm';

import './header.css';

function Header({ hTitle, hSearchDisabled = false }) {
  const { searchBarStatus, searchBarOnOff } = useContext(RecipesContext);
  const history = useHistory();

  return (
    <header className="header-component">
      <div className="upper-header">
        <IconButton
          hDataTestId="profile-top-btn"
          hIconSrc={ profileIcon }
          hAltText="Profile Button"
          hOnClick={ () => history.push('/profile') }
        />

        <h1 className="header-title" data-testid="page-title">{hTitle}</h1>

        {hSearchDisabled ? <div /> : <IconButton
          hDataTestId="search-top-btn"
          hIconSrc={ searchIcon }
          hAltText="Search Button"
          hOnClick={ searchBarOnOff }
        />}
      </div>

      {searchBarStatus ? <SearchForm /> : ''}

    </header>
  );
}

Header.propTypes = {
  hTitle: PropTypes.string.isRequired,
  hSearchDisabled: PropTypes.bool,
};

export default Header;
