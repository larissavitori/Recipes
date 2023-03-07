import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginProvider } from '../context';
import {
  Login, Meals, Drinks, Favorites, Profile, DoneRecipes,
} from '../pages';
import RecipesProvider from '../context/recipesContext/RecipesProvider';
import RecipeDetails from '../components/recipeDetails/RecipeDetails';
import RecipeInProgress from '../components/RecipeInProgress/RecipeInProgress';

function Routes() {
  return (
    <LoginProvider>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route
            exact
            path="/meals/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route exact path="/drinks" component={ Drinks } />
          <Route
            exact
            path="/drinks/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
          <Route
            exact
            path="/meals/:id-da-receita/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/drinks/:id-da-receita/in-progress"
            component={ RecipeInProgress }
          />
        </Switch>
      </RecipesProvider>
    </LoginProvider>
  );
}

export default Routes;
