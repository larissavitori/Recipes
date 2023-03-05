import PropTypes from 'prop-types';
import React from 'react';

function Button({
  bDataTestId,
  bHandleClick,
  bTitle,
  bValidation = false,
  bClassName = '',
}) {
  return (
    <button
      className={ `${bClassName} default-button` }
      data-testid={ bDataTestId }
      disabled={ bValidation }
      onClick={ bHandleClick }
    >
      {bTitle}
    </button>
  );
}

Button.propTypes = {
  bClassName: PropTypes.string,
  bDataTestId: PropTypes.string.isRequired,
  bHandleClick: PropTypes.func.isRequired,
  bTitle: PropTypes.string.isRequired,
  bValidation: PropTypes.bool,
};

export default Button;
