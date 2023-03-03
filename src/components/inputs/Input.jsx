import React from 'react';
import { RiErrorWarningLine } from 'react-icons';
import PropTypes from 'prop-types';

function Input(
  {
    iType, iName, iPlaceholder, iDataTestId, iValue, iOnChange,
    children,
    validationError = false,
  },
) {
  return (
    <div
      className={ validationError ? 'input-box warning' : 'input-box' }
    >
      <RiErrorWarningLine
        className={ validationError ? 'input-warning' : 'input-warning-disabled' }
      />
      <input
        className="input-item"
        data-testid={ iDataTestId }
        type={ iType }
        name={ iName }
        value={ iValue }
        onChange={ iOnChange }
        placeholder={ iPlaceholder }
      />
      { children }
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
  validationError: PropTypes.bool,
};

export default Input;
