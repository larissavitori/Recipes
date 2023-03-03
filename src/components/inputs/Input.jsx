import React from 'react';
import PropTypes from 'prop-types';

function Input(
  {
    iType, iName, iPlaceholder, iDataTestId, iValue, iOnChange,
    children,
  },
) {
  return (
    <div
      className="input-box"
    >
      { children }
      <input
        className="input-item"
        data-testid={ iDataTestId }
        type={ iType }
        name={ iName }
        value={ iValue }
        onChange={ iOnChange }
        placeholder={ iPlaceholder }
      />
    </div>
  );
}

Input.propTypes = {
  iType: PropTypes.string.isRequired,
  iName: PropTypes.string.isRequired,
  iPlaceholder: PropTypes.string.isRequired,
  iDataTestId: PropTypes.string.isRequired,
  iValue: PropTypes.string.isRequired,
  iOnChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Input;
