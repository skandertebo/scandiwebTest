import React from 'react';
import {useNavigate} from 'react-router-dom';

const AddProductHeader: React.FC = () => {
  
  const navigate = useNavigate();

  return(
    <div className="header">
      <h1>Product Add</h1>
      <div className='action-buttons'>
        <button className="btn btn-primary" role="submit" form='product_form'>Save</button>
        <button className="btn btn-secondary" onClick={()=>navigate('/')}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductHeader;