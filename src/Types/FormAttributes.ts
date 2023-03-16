import { formSpecialProperties } from '../formSpecialProperties';

type keyType = 'sku' | 'name' | 'price';

export type FormAttributes = {
  [key in keyType]: InputAttributes;
} & { 
  specialProperties:typeof formSpecialProperties.book | typeof formSpecialProperties.dvd | typeof formSpecialProperties.furniture;
}


export interface InputAttributes {
  label:string,
  value:string,
  type:string,
  required:boolean,
  error:string,
  validator:(value:string) => string
}