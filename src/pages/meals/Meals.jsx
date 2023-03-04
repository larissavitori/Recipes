import React from 'react';
import { Header, RecipesGrid } from '../../components';
import Footer from '../../components/footer/Footer';

function Meals() {
  return (
    <div>
      <Header hTitle="Meals" />
      <RecipesGrid />
      <Footer />
    </div>
  );
}

export default Meals;
