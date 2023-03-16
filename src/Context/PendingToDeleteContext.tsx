import React from 'react';
import {createContext, useState, useContext, useCallback} from 'react';
import { PendingToDeleteContextProps } from '../Types/PendingToDeleteContextProps';
import { Product } from '../Types/Product';
const pendingToDeleteContext = createContext<PendingToDeleteContextProps>({} as PendingToDeleteContextProps);

export const usePendingToDelete = () => useContext(pendingToDeleteContext);

const PendingToDeleteProvider:React.FC<React.PropsWithChildren> = ({children}) => {
  const [pendingToDelete, setPendingToDelete] = useState<Product[]>([]);

  const addPendingToDelete = useCallback((product:Product)=>{
    setPendingToDelete([...pendingToDelete, product]);
  },[pendingToDelete]);

  const removePendingToDelete = useCallback((product:Product)=>{
    setPendingToDelete(pendingToDelete.filter((p)=>p!==product));
  },[pendingToDelete]);

  const clearPendingToDelete = useCallback(()=>{
    setPendingToDelete([]);
  },[]);

  return(
    <pendingToDeleteContext.Provider value={{pendingToDelete, addPendingToDelete, removePendingToDelete, clearPendingToDelete}}>
      {children}
    </pendingToDeleteContext.Provider>
  );
};
  
export {PendingToDeleteProvider};