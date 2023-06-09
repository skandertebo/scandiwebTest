/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRoute } from '../appConfig';

export default async function addProduct(formData: FormData): Promise<any>{
  const response = await fetch(apiRoute+'/products', {
    method: 'POST',
    headers: {
      'accept': 'application/json'
    },
    body: formData
  });
  const data = await response.json();

  return data;
}