import React from 'react';
import {useNavigate} from 'react-router-dom';
import { usePendingToDelete } from '../Context/PendingToDeleteContext';
import {useCallback} from 'react';
import massDeleteProducts from '../ApiCalls/massDeleteProducts';
import { useProducts } from '../Context/ProductsContext';
import { ProductsContext } from '../Types/ProductsContextType';

const HomeHeader: React.FC = () => {
  
  const navigate = useNavigate();
  const {pendingToDelete, clearPendingToDelete} = usePendingToDelete();
  const {products, setProducts} = useProducts() as ProductsContext;  

  const handleDelete = useCallback(
    () => {
      // generate a string with skus to delete separated by comma
      massDeleteProducts(pendingToDelete).then((res)=>{
        if(res.message==='Success'){
          // delete the products from the products array
          products && setProducts(products.filter((p)=>!pendingToDelete.includes(p)));
          // clear the pendingToDelete array
          clearPendingToDelete();
        }
      });
    },
    [pendingToDelete],
  );
  

  return(
    <div className="header">
      <h1>Product Add</h1>
      <div className='action-buttons'>
        <button className="btn btn-primary" onClick={()=>navigate('/addproduct')}>ADD</button>
        <button className="btn btn-danger" onClick={handleDelete} disabled={pendingToDelete.length===0}>MASS DELETE</button>
      </div>
    </div>
  );
};

export default HomeHeader;