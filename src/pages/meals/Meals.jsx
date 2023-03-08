import React from 'react';
import { Header, RecipesGrid, Footer, CategoryList } from '../../components';

function Meals() {
  return (
    <main className="recipes-page">
      <Header hTitle="Meals" />
      <CategoryList />
      <RecipesGrid />
      <Footer />
    </main>
  );
}

export default Meals;
