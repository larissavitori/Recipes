import React from 'react';
import { Header, RecipesGrid, Footer, CategoryList } from '../../components';

function Drinks() {
  return (
    <main className="recipes-page">
      <Header hTitle="Drinks" />
      <CategoryList />
      <RecipesGrid />
      <Footer />
    </main>
  );
}

export default Drinks;
