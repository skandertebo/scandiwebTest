export interface AppContextProps {
  error:string;
  setError: (error: string) => void;
  enableLoading: () => void;
  disableLoading: () => void;
  makeNotification: (message: string, type: string, time?:number) => void;
}