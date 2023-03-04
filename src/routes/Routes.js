import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginProvider } from '../context';
import {
  Login, Meals, MealView, Drinks, DrinkView, Favorites, Profile, DoneRecipes,
} from '../pages';

function Routes() {
  return (
    <Switch>
      <LoginProvider>
        <Route exact path="/" component={ Login } />
      </LoginProvider>
      <Route exact path="/meals" component={ Meals } />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <MealView { ...props } /> }
      />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <DrinkView { ...props } /> }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default Routes;
