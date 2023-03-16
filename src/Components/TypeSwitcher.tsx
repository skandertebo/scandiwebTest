import React from 'react';
import { ProductEnum } from '../Enum/ProductEnum';
import { TypeSwitcherProps } from '../Types/TypeSwitcherProps';

const TypeSwitcher: React.FC<TypeSwitcherProps> = ({productType, onChange}: TypeSwitcherProps) => {
  return(
    <div className="type-switcher form-group">
      <label htmlFor="type">Type Switcher</label>
      <select id="productType" name="type" value={productType} onChange={onChange}>
        <option value={ProductEnum.DVD}>DVD</option>
        <option value={ProductEnum.BOOK}>Book</option>
        <option value={ProductEnum.FURNITURE}>Furniture</option>
      </select>
    </div>
  );
};

export default TypeSwitcher;