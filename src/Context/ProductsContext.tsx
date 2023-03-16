import React from 'react';
import {createContext, useState, useEffect, useContext} from 'react';
import { Product } from '../Types/Product';
import { ProductsContext } from '../Types/ProductsContextType';
import { getProducts } from '../ApiCalls/getProducts';


const productsContext = createContext<ProductsContext | null>(null);

export const useProducts = () => {
  return useContext(productsContext);
};

export const ProductsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    getProducts().then((products:Product[])=>setProducts(products));
  }, []);

  return (
    <productsContext.Provider value={{products, setProducts}}>
      {children}
    </productsContext.Provider>
  );
};
