'use client';

import styled, { useTheme } from 'styled-components';
import { useState, useEffect } from 'react';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ type, theme }) =>
    type === 'success' ? theme.colors.primaryLight :
    type === 'error' ? theme.colors.tertiary :
    type === 'warning' ? theme.colors.secondaryLight :
    type === 'info' ? theme.colors.primary : theme.colors.main};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '20px')});
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default function GlobalNotification({ message, type = 'info', onClose }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Espera a la animación antes de eliminar el mensaje
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <NotificationContainer type={type} theme={theme} visible={visible}>
      {message}
      <CloseButton onClick={() => setVisible(false)}>&times;</CloseButton>
    </NotificationContainer>
  );
}