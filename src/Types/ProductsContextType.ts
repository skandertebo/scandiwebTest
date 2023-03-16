import { Product } from './Product';

export interface ProductsContext {
  products: Product[] |  undefined |  null;
  setProducts: (products: Product[]) => void;
}