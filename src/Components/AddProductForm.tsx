import React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import addProduct from '../ApiCalls/addProduct';
import { checkSkuUniqueness } from '../checkSkuUniqueness';
import { useAppContext } from '../Context/AppContext';
import { useProducts } from '../Context/ProductsContext';
import { ProductEnum } from '../Enum/ProductEnum';
import { formSpecialProperties, formSpecialPropertiesDescription } from '../formSpecialProperties';
import { FormAttributes } from '../Types/FormAttributes';
import { bookProperties, dvdProperties, furnitureProperties, Product, ProductFactory} from '../Types/Product';
import { ProductsContext } from '../Types/ProductsContextType';
import TypeSwitcher from './TypeSwitcher';


const AddProductForm:React.FC = () => {

  const {setProducts, products} = useProducts() as ProductsContext;

  const {enableLoading, disableLoading, makeNotification} = useAppContext();

  const [productType, setProductType] = useState<ProductEnum>(ProductEnum.DVD);

  const navigate = useNavigate();

  const [formAtrributes, setFormAttributes] = useState<FormAttributes>({
    'sku':{
      label:'SKU',
      value:'',
      type:'text',
      required:true,
      error:'',
      validator:(value: string) => value.length > 0?'': 'SKU cannot be empty' 
    },
    'name':{
      label:'Name',
      value:'',
      type:'text',
      required:true,
      error:'',
      validator:(value:string) => value.length > 0?'': 'Name cannot be empty'
    },
    'price':{
      label:'Price ($)',
      value:'',
      type:'number',
      required:true,
      error:'',
      validator:(value: string) => parseInt(value) > 0?'':'Price must be greater than 0' 
    },
    specialProperties:formSpecialProperties[productType]
  });

  const handleProductTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductType(e.target.value as ProductEnum);
    setFormAttributes({
      ...formAtrributes,
      specialProperties:formSpecialProperties[e.target.value as ProductEnum]
    });
  },[productType, formAtrributes]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormAttributes({
      ...formAtrributes,
      [name]:{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ...formAtrributes[name],
        value
      }
    });
  },[formAtrributes]);

  const handleSpecialPropertiesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormAttributes({
      ...formAtrributes,
      specialProperties:{
        ...formAtrributes.specialProperties,
        [name]:{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          ...formAtrributes.specialProperties[name],
          value
        }
      }
    });
  },[formAtrributes]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {

    enableLoading();
    e.preventDefault();

    let hasError = false;
    
    Object.keys(formAtrributes).forEach((objKey) => {
      const key = objKey as keyof typeof formAtrributes;
      if(key !== 'specialProperties'){
        const error = formAtrributes[key].validator(formAtrributes[key].value);
        formAtrributes[key].error = error;
        if(error){
          hasError = true;
        }
      }
    });

    Object.keys(formAtrributes.specialProperties).forEach((innerObjKey) => {
      const innerKey = innerObjKey as keyof typeof formAtrributes.specialProperties;
      const attribute = formAtrributes.specialProperties[innerKey];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const error = attribute.validator(attribute.value);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      attribute.error = error;
      if(error){
        hasError = true;
      }
    });
    
    if(!checkSkuUniqueness(formAtrributes.sku.value, products as Product[])){
      formAtrributes.sku.error = 'SKU already exists';
      hasError = true;
    }

    setFormAttributes({...formAtrributes});

    if(hasError){
      disableLoading();
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    addProduct(formData).then(res => {
      if(res.message === 'Success'){
        makeNotification('Product added successfully', 'success');
        const specialProperties = Object.keys(formAtrributes.specialProperties).reduce((acc, key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          acc[key] = formAtrributes.specialProperties[key].value;
          return acc;
        }, {});
        const newProduct = ProductFactory.createProduct(productType, {'sku':formAtrributes.sku.value, 'name':formAtrributes.name.value, 'price':parseFloat(formAtrributes.price.value), ...specialProperties} as dvdProperties | bookProperties | furnitureProperties);
        products && setProducts([newProduct, ...products]);
        navigate('/');
      }
      else{
        makeNotification('Something went wrong', 'danger');
      }
    }).finally(()=>{
      disableLoading();
    });
  },[formAtrributes]);

  return(
    <form id="product_form" onSubmit={handleSubmit}>
      {
        Object.keys(formAtrributes).filter(key=>key!=='specialProperties').map((key, idx) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const attribute = formAtrributes[key];
          return(
            <div className="form-group" key={idx}>
              <label htmlFor={key}>{attribute.label}</label>
              <div className="input-error-wrapper">
                <input id={key} type={attribute.type} name={key} value={attribute.value} onChange={handleInputChange} style={{borderColor:attribute.error?'red':undefined}} />
                {attribute.error&&<span className="error-text">{attribute.error}</span>}
              </div>
            </div>
          );
        })
      }
      <TypeSwitcher productType={productType} onChange={handleProductTypeChange} />
      <div className="special-props">
        {
          Object.keys(formAtrributes.specialProperties).map((key, idx) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
            const attribute = formAtrributes.specialProperties[key];
            return(
              <div className="form-group" key={idx}>
                <label htmlFor={key}>{attribute.label}</label>
                <div className="input-error-wrapper">
                  <input id={key} type={attribute.type} name={key} value={attribute.value} onChange={handleSpecialPropertiesChange} style={{borderColor:attribute.error?'red':undefined}} />
                  {attribute.error&&<span className="error-text">{attribute.error}</span>}
                </div>
              </div>
            );
          })
        }
        <p>{formSpecialPropertiesDescription[productType]}</p>
      </div>
    </form>
  );
};

export default AddProductForm;