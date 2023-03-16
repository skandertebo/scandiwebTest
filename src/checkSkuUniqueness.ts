import { Product } from './Types/Product';

export const checkSkuUniqueness = (sku:string, products:Product[]) : boolean => {
  return products.filter(product => product.sku === sku).length === 0;
};