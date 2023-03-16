import React from 'react';
import { useProducts } from '../Context/ProductsContext';
import { Container } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { ProductsContext } from '../Types/ProductsContextType';
import { usePendingToDelete } from '../Context/PendingToDeleteContext';
import LoadingLayer from '../layouts/LoadingLayer';

const CardsContainer:React.FC = () => {
  const {products} = useProducts() as ProductsContext;
  const {addPendingToDelete, removePendingToDelete, pendingToDelete} = usePendingToDelete();

  if(products === undefined){
    return <LoadingLayer />;
  }

  return(
    <Container className="products-container">
      {products?products.map((product,idx) => {
        return(
          <ProductCard product={product} idx={idx} key={idx} checked={pendingToDelete.includes(product)} onCheck={addPendingToDelete} onUncheck={removePendingToDelete} />
        );
      }):'Loading...'}
    </Container>
  );
};

export default CardsContainer;