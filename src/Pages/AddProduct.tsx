import React from 'react';
import AddProductForm from '../Components/AddProductForm';
import AddProductHeader from '../Components/AddProductHeader';

export const AddProduct: React.FC = () => {
  return(
    <div className="add-product-page page">
      <AddProductHeader />
      <AddProductForm />
    </div>
  );
};

export default AddProduct;