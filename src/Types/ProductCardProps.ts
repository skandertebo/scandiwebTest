import React from 'react';
import { Product } from './Product';

export interface ProductCardProps extends React.PropsWithoutRef<JSX.IntrinsicElements['div']> {
  product: Product;
  onCheck: (product:Product)=>void;
  onUncheck: (product: Product)=>void;
  key: number;
  idx:number;
  checked: boolean;
}