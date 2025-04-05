import React, { createContext, useContext, useState } from 'react';
import GlobalNotification from '../ui/utilities/GlobalNotification';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const notify = (message, type = "succes", duration = 3000) => {
    setNotification({ message, type, duration });

    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <GlobalNotification
          message={notification.message} 
          type={notification.type}
          duration={notification.duration}
        />
      )}
    </NotificationContext.Provider>
  );
};
