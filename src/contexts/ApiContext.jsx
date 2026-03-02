import { createContext, useState, useCallback } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = useCallback(
    async (page = 1, category = "all", search = "") => {
      setLoading(true);
      try {
        const limit = 12;
        const skip = (page - 1) * limit;

        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        } else if (category !== "all") {
          url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
        }

        const response = await axios.get(url);
        let fetchedProducts = response.data.products;
        let total = response.data.total;

        if (search && category !== "all") {
          fetchedProducts = fetchedProducts.filter(
            (p) => p.category === category,
          );
          total = fetchedProducts.length;
        }

        setProducts(fetchedProducts);
        setTotalPages(Math.ceil(total / limit));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        totalPages,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
