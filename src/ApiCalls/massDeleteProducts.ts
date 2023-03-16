import { Product } from '../Types/Product';
import { apiRoute } from '../appConfig';
export default async function massDeleteProducts(products:Product[]){
  const skus = products.map((product:Product)=>product.sku).join(',');
  const response = await fetch(`${apiRoute}/massDeleteProducts?ids=${skus}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}