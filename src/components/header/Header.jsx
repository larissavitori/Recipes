import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ hTitle, hSearchDisabled = false }) {
  const history = useHistory();

  return (
    <header className="header-component">
      <button
        className="icon-btn"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img className="icon-img" src={ profileIcon } alt="profile-icon" />
      </button>

      <h1 className="header-title" data-testid="page-title">{hTitle}</h1>

      <button
        className={ hSearchDisabled ? 'btn-disabled' : 'icon-btn' }
        data-testid="search-top-btn"
        disabled={ hSearchDisabled }
      >
        <img className="icon-img" src={ searchIcon } alt="search-icon" />
      </button>
    </header>
  );
}

Header.propTypes = {
  hTitle: PropTypes.string.isRequired,
  hSearchDisabled: PropTypes.bool,
};

export default Header;
