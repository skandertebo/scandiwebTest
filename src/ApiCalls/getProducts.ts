/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, Dvd, Furniture, Book} from '../Types/Product';
import { apiRoute } from '../appConfig';
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(apiRoute+'/products');
  const data = await response.json();
  const id = 'sku';

  const products: Product[] = [];
  data.book.forEach((book:any) => {
    book.weigth = parseFloat(book.weigth);
    book.price = parseFloat(book.price);
    products.push(new Book(book));
  });
  data.dvd.forEach((dvd:any) => {
    dvd.size = parseFloat(dvd.size);
    dvd.price = parseFloat(dvd.price);
    products.push(new Dvd(dvd));
  });
  data.furniture.forEach((furniture:any) => {
    furniture.height = parseFloat(furniture.height);
    furniture.width = parseFloat(furniture.width);
    furniture.length = parseFloat(furniture.length);
    furniture.price = parseFloat(furniture.price);
    products.push(new Furniture({price:furniture.price, sku:furniture.sku, name:furniture.name, height:furniture.height, width:furniture.width, length:furniture.length}));
  });

  products.sort((a: Product, b: Product) => {
    if (a[id] < b[id]) return -1;
    if (a[id] > b[id]) return 1;
    return 0;
  });

  return products;
};

