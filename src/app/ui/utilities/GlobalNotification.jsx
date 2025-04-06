'use client';

import styled, { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';

const typeColors = {
  success: {
    emoji: '✅',
    border: '#D3624B',
    bg: 'rgba(247, 241, 236, 0.8)'
  },
  error: {
    emoji: '❌',
    border: '#E8A65D',
    bg: 'rgba(232, 166, 93, 0.15)'
  },
  warning: {
    emoji: '⚠️',
    border: '#679693',
    bg: 'rgba(231, 246, 243, 0.8)'
  },
  info: {
    emoji: 'ℹ️',
    border: '#D3624B',
    bg: 'rgba(211, 98, 75, 0.15)'
  }
};

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  max-width: 320px;
  padding: 16px 20px;
  border-left: 6px solid ${({ type }) => typeColors[type]?.border};
  background: ${({ type }) => typeColors[type]?.bg};
  backdrop-filter: blur(8px);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.foreground};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  font-size: 15px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'scale(1)' : 'scale(0.95)' )};
  transition: all 0.4s ease-in-out;
  z-index: 10000;
`;

const Emoji = styled.span`
  font-size: 20px;
  margin-top: 2px;
`;

const Message = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  line-height: 1;
  padding: 0 5px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;

export default function GlobalNotification({ message, type = 'info', duration = 3000 }) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {}, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <NotificationContainer type={type} visible={visible}>
      <Emoji>{typeColors[type]?.emoji}</Emoji>
      <Message>{message}</Message>
      <CloseButton onClick={() => setVisible(false)}>&times;</CloseButton>
    </NotificationContainer>
  );
}
