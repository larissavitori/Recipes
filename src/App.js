import React from 'react';
import Routes from './routes/Routes';
import { ResearchRecipesProvider, LoginProvider, RecipeProvider } from './context';

import './App.css';

function App() {
  return (
    <LoginProvider>
      <RecipeProvider>
        <ResearchRecipesProvider>
          <Routes />
        </ResearchRecipesProvider>
      </RecipeProvider>
    </LoginProvider>
  );
}

export default App;
