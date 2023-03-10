import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login, Meals, RecipeDetails, Drinks, Favorites, ProfilePage, DoneRecipes,
  RecipeInProgress,
} from '../pages';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route exact path="/profile" component={ ProfilePage } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default Routes;
