import React, { useContext } from 'react';
import { Header, Recipes, Footer, CategoryList } from '../../components';
import { getDrinksCategoryList } from '../../service/api';
import { ResearchRecipesContext } from '../../context';

function Drinks() {
  const [categories, setCategories] = useState([]);
  const {
    handleGetRecipesByCategory, handleGetRecipes,
  } = useContext(ResearchRecipesContext);

  const handleSetCategory = (categoryList) => {
    setCategories(categoryList);
  };

  useEffect(() => {
    async function fetchDrinksCategoriesList() {
      const fetchData = await getDrinksCategoryList();
      handleSetCategory(fetchData);
    }

    fetchDrinksCategoriesList();
  }, []);

  return (
    <main className="recipes-page">
      <Header hTitle="Drinks" />
      <CategoryList
        categoriesList={ categories }
        handleGetAll={ () => handleGetRecipes() }
        handleGetByCategory={ handleGetRecipesByCategory }
      />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Drinks;
