import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import IconButton from '../buttons/IconButton';
import './footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer-component" data-testid="footer">
      <IconButton
        hDataTestId="drinks-bottom-btn"
        hIconSrc={ drinkIcon }
        hAltText="drink-icon"
        hOnClick={ () => history.push('/drinks') }
      />
      <IconButton
        hDataTestId="meals-bottom-btn"
        hIconSrc={ mealIcon }
        hAltText="meal-icon"
        hOnClick={ () => history.push('/meals') }
      />
    </footer>
  );
}

export default Footer;
