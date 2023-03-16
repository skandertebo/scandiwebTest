import {createContext, useState, useCallback, useContext, PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';
import { AppContextProps } from '../Types/AppContextProps';
import React from 'react';
import LoadingLayer from '../layouts/LoadingLayer';
import NotificationBar from '../Components/NotificationBar';
const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider:React.FC<PropsWithChildren> = ({children}) => {
  const [notification, setNotification] = useState<null | {type:string, message:string}>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const enableLoading = useCallback(() => {
    setLoading(true);
  },[]);
  const disableLoading = useCallback(() => {
    setLoading(false);
  },[]);
  const makeNotification = useCallback((message: string, type: string, time=2000) => {
    setNotification({message, type});
    setTimeout(() => {
      setNotification(null);
    }
    , time);
  },[]);




  return (
    <AppContext.Provider value={{makeNotification, error, setError, enableLoading, disableLoading}}>
      {loading && <LoadingLayer />}
      {children}
      {notification && createPortal(
        <NotificationBar type={notification.type} message={notification.message} />,
        document.getElementById('notification') as HTMLElement
      )}
    </AppContext.Provider>
  );
};