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
      setNotification(null); // Limpiar la notificación después de que termine el tiempo
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <GlobalNotification
          message={notification.message}  // Pasar solo el mensaje y el tipo
          type={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};
