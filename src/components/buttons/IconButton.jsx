import React from 'react';
import PropTypes from 'prop-types';

import './buttons.css';

function IconButton({ hDataTestId, hIconSrc, hAltText, hOnClick }) {
  return (
    <button
      className="icon-btn"
      onClick={ hOnClick }
    >
      <img
        className="icon-img"
        data-testid={ hDataTestId }
        src={ hIconSrc }
        alt={ hAltText }
      />
    </button>
  );
}

IconButton.propTypes = {
  hDataTestId: PropTypes.string.isRequired,
  hIconSrc: PropTypes.string.isRequired,
  hAltText: PropTypes.string.isRequired,
  hOnClick: PropTypes.func.isRequired,
};

export default IconButton;
