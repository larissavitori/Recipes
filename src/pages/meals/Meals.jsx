import React from 'react';
import { Header, Recipes, Footer, CategoryList } from '../../components';

function Meals() {
  return (
    <main className="recipes-page">
      <Header hTitle="Meals" />
      <CategoryList />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Meals;
