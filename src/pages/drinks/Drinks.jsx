import React from 'react';
import { Header, RecipesGrid } from '../../components';
import Footer from '../../components/footer/Footer';

function Drinks() {
  return (
    <div>
      <Header hTitle="Drinks" />
      <RecipesGrid />
      <Footer />
    </div>
  );
}

export default Drinks;
