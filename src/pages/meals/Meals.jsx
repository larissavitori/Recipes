import React from 'react';
import { Header, RecipesGrid } from '../../components';
import Footer from '../../components/footer/Footer';

function Meals() {
  return (
    <main className="recipes-page">
      <Header hTitle="Meals" />
      <RecipesGrid />
      <Footer />
      <Footer />
    </main>
  );
}

export default Meals;
