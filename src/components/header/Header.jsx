import PropTypes from 'prop-types';
import React from 'react';
import './header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ hTitle }) {
  return (
    <div>
      <button
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="profile-icon" />
      </button>
      <button
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="search-icon" />
      </button>
      <h1 data-testid="page-title">{hTitle}</h1>

    </div>
  );
}

Header.propTypes = {
  hTitle: PropTypes.string.isRequired,
};

export default Header;
