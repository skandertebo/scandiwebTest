import { ProductEnum } from '../Enum/ProductEnum';
import React from 'react';

export interface TypeSwitcherProps {
  productType: ProductEnum,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}