import { useEffect, useState } from 'react';
import { fetcher } from '../fetcher';

function FilterData() {
  const [allCategory, setAllCategory] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);
  const [allActiveProducts, setAllActiveProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = (await fetcher.get('/product/all')).data;

        setAllCategory(resData);

        let subcategories = [];
        let discountProducts = [];
        let activeProducts = [];
        let allProductsArray = [];

        resData.length > 0 && resData.map((category) => {
          subcategories = [...subcategories, ...category.subCategories];

          category.subCategories.map((subcategory) => {
            const discounted = subcategory.products.filter(x => x.discount !== null && x.status === "ACTIVE");
            const active = subcategory.products.filter(x => x.status === "ACTIVE");

            discountProducts = [...discountProducts, ...discounted];
            activeProducts = [...activeProducts, ...active];
            allProductsArray = [...allProductsArray, ...subcategory.products];
          });
        });

        
        setAllSubCategory(subcategories);
        setDiscountProduct(discountProducts);
        setAllActiveProducts(activeProducts);
        setAllProducts(allProductsArray);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);


  return { allCategory, allSubCategory, discountProduct, allActiveProducts, allProducts };
}

export { FilterData };
