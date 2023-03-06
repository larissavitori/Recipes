import PropTypes from 'prop-types';
import React from 'react';

import './input.css';

function RadioInputs({ rData, rName, rHandleChange }) {
  return (
    <div className="radio-box">
      {
        rData.map(({ rDataTestId, rTitle, rValue }, id) => (
          <label key={ id } htmlFor={ `${rName}-${id}` } className="radio-label">
            <input
              type="radio"
              className="radio-input"
              id={ `${rName}-${id}` }
              data-testid={ rDataTestId }
              name={ rName }
              value={ rValue }
              onChange={ rHandleChange }
            />
            {rTitle}
          </label>
        ))
      }
    </div>
  );
}

RadioInputs.propTypes = {
  rData: PropTypes.arrayOf(
    PropTypes.shape({
      rDataTestId: PropTypes.string.isRequired,
      rTitle: PropTypes.string.isRequired,
      rValue: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  rName: PropTypes.string.isRequired,
  rHandleChange: PropTypes.func.isRequired,
};

export default RadioInputs;
