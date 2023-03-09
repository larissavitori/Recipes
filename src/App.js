import React from 'react';
import Routes from './routes/Routes';
import { ResearchRecipesProvider, LoginProvider } from './context';

import './App.css';

function App() {
  return (
    <LoginProvider>
      <ResearchRecipesProvider>
        <Routes />
      </ResearchRecipesProvider>
    </LoginProvider>
  );
}

export default App;
