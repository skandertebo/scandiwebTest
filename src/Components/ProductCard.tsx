import React from 'react';
import { ProductCardProps } from '../Types/ProductCardProps';
import Card from 'react-bootstrap/Card';
import {useCallback} from 'react';
import { useProducts } from '../Context/ProductsContext';
import { ProductsContext } from '../Types/ProductsContextType';

const ProductCard:React.FC<ProductCardProps> = ({product, onCheck, idx, onUncheck, checked}:ProductCardProps) => {
  
  const {products} = useProducts() as ProductsContext;
  const onCheckHandler = useCallback(()=>{
    if(!checked){
      products && onCheck(products[idx]);
    }
    else{
      products && onUncheck(products[idx]);
    }
  },[checked, onCheck, products, onUncheck]);


  const textStyle= {margin:'0.2em'};
  return(
    <Card className='product-card'>
      <div className="delete-checkbox-wrapper">
        <input className='delete-checkbox' type="checkbox" onChange={onCheckHandler} checked={checked} />
      </div>
      <Card.Body>
        <Card.Text style={textStyle}>
          {product.sku}
        </Card.Text>
        <Card.Text style={textStyle}>
          {product.name}
        </Card.Text>
        <Card.Text style={textStyle}>
          {product.getFormattedPrice()}
        </Card.Text>
        <Card.Text style={textStyle}>
          {product.getSpecificPropertiesFormatted()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
