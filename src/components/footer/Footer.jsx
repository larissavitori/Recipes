import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer-component" data-testid="footer">
      <button
        onClick={ () => {
          history.push('/drinks');
        } }

      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink-icon" />
      </button>
      <button
        onClick={ () => {
          history.push('/meals');
        } }

      >
        <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
