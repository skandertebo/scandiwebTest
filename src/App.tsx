import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProductsProvider} from './Context/ProductsContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {lazy} from 'react';
import LoadingLayer from './layouts/LoadingLayer';
const Home = lazy(()=>import('./Pages/Home'));
const AddProduct = lazy(()=>import('./Pages/AddProduct'));

function App() {
  return(
    <ProductsProvider>
      <Suspense fallback={<LoadingLayer />}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='addproduct' element={<AddProduct />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ProductsProvider>
  );
}

export default App;

