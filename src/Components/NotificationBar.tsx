import React from 'react';
import { Alert } from 'react-bootstrap';

const NotificationBar:React.FC<{type:string, message:string}> = ({type, message}) => {
  return (
    <Alert variant={type}>
      {message}
    </Alert>
  );
};

export default NotificationBar;