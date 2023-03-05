import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import IconButton from '../buttons/IconButton';
import SearchForm from '../searchForm/SearchForm';

function Header({ hTitle, hSearchDisabled = false }) {
  const history = useHistory();
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleClick = () => {
    setOpenSearchBar(!openSearchBar);
  };

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
          hOnClick={ handleClick }
        />}
      </div>

      {openSearchBar ? <SearchForm /> : ''}

    </header>
  );
}

Header.propTypes = {
  hTitle: PropTypes.string.isRequired,
  hSearchDisabled: PropTypes.bool,
};

export default Header;
