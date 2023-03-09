import React from 'react';
import { Header, Recipes, Footer, CategoryList } from '../../components';

function Drinks() {
  return (
    <main className="recipes-page">
      <Header hTitle="Drinks" />
      <CategoryList />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Drinks;
