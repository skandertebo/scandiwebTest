import { ProductEnum } from '../Enum/ProductEnum';


abstract class Product {
  public sku: string;
  public name: string;
  public price: number;
  constructor({ sku, name, price }: productProperties) {
    this.sku = sku;
    this.name = name;
    this.price = price;
  }

  public getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  public abstract getSpecificPropertiesFormatted(): string;

}

export interface productProperties { sku: string, name: string, price: number }

export {Product};

class Dvd extends Product {
  public size: string;
  constructor({ sku, name, price, size }: dvdProperties) {
    super({ sku, name, price });
    this.size = size;
  }

  public getSpecificPropertiesFormatted(): string {
    return `Size: ${this.size} MB`;
  }

}

export interface dvdProperties extends productProperties { size: string }

export {Dvd};

class Book extends Product {
  public weight: string;
  constructor({ sku, name, price, weight }: bookProperties) {
    super({ sku, name, price });
    this.weight = weight;
  }

  public getSpecificPropertiesFormatted(): string {
    return `Weight: ${this.weight}KG`;
  }

}

export interface bookProperties extends productProperties { weight: string }

export {Book};

class Furniture extends Product {

  public dimensions: Dimensions;
  constructor({ sku, name, price, height, width, length }: furnitureProperties) {
    super({ sku, name, price });
    this.dimensions = { height, width, length};
  }

  public getDimensionsString(): string {
    return `${this.dimensions.height}x${this.dimensions.width}x${this.dimensions.length}`;
  }

  public getSpecificPropertiesFormatted(): string {
    return `Dimensions: ${this.getDimensionsString()}`;
  }

}

export interface furnitureProperties extends productProperties { height: number, width: number, length: number }

export type Dimensions = {
  height: number;
  width: number;
  length: number;
};

export {Furniture};

class ProductFactory {
  public static createProduct(type:ProductEnum, product: bookProperties | furnitureProperties | dvdProperties): Product {
    switch (type) {
    case ProductEnum.DVD:
      return new Dvd(product as dvdProperties);
    case ProductEnum.BOOK:
      return new Book(product as bookProperties);
    case ProductEnum.FURNITURE:
      return new Furniture(product as furnitureProperties);
    default:
      throw new Error('Invalid product type');
    }
  }
}

export {ProductFactory};