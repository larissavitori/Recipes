import React from 'react';
import { Header, RecipesGrid } from '../../components';
import Footer from '../../components/footer/Footer';

function Drinks() {
  return (
    <main className="recipes-page">
      <Header hTitle="Drinks" />
      <RecipesGrid />
      <Footer />
    </main>
  );
}

export default Drinks;
