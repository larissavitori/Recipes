import React from 'react';
import Routes from './routes/Routes';
import { RecipesProvider, LoginProvider } from './context';

import './App.css';

function App() {
  return (
    <LoginProvider>
      <RecipesProvider>
        <Routes />
      </RecipesProvider>
    </LoginProvider>
  );
}

export default App;
