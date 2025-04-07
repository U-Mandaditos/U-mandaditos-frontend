import styled, { keyframes } from 'styled-components';

// Animaciones
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

// Componentes estilizados
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
`;

const IconWrapper = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  svg {
    width: 40px;
    height: 40px;
  }
`;

const Message = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
  margin: 0;
  animation: ${blink} 2s ease-in-out infinite;
`;

// SVG personalizado
const EmptyStateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8V6C16 4.89543 15.1046 4 14 4H10C8.89543 4 8 4.89543 8 6V8" stroke="#928E8D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 10C3 8.89543 3.89543 8 5 8H19C20.1046 8 21 8.89543 21 10V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V10Z" stroke="#928E8D" strokeWidth="1.5"/>
    <path d="M8 12H16" stroke="#928E8D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function NoDeliveries() {
  return (
    <Container>
      <IconWrapper>
        <EmptyStateIcon />
      </IconWrapper>
      <Message>No tienes mandaditos en curso</Message>
    </Container>
  );
}