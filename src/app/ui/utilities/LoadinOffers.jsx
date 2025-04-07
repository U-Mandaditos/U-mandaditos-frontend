import styled, { keyframes } from 'styled-components';

// Animaciones mejoradas
const subtleBounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.03); }
`;

const pulseWave = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

// Componentes rediseñados
const WaitingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
`;

const AnimatedIllustration = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 1.25rem;
  animation: ${subtleBounce} 2.5s ease-in-out infinite;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Title = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const Message = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

const CommunityIndicator = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 120px;
  height: 40px;
  margin-bottom: 1.5rem;
`;

const UserDot = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  animation: ${pulseWave} 2s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0'}s;
  box-shadow: 0 2px 8px rgba(211, 98, 75, 0.3);
  
  &:nth-child(1) { left: 0; top: 0; }
  &:nth-child(2) { left: 44px; top: 8px; }
  &:nth-child(3) { right: 0; top: 0; }
`;

const HintText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
  animation: ${fadeInOut} 3s ease-in-out infinite;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 1rem;
`;

// Componente principal mejorado
export function WaitingForMandados() {
  return (
    <WaitingContainer>
      <AnimatedIllustration>
        <img src='/icons/user-running.svg' alt="Esperando ofertas" />
      </AnimatedIllustration>
      
      <Title>Esperando Ofertas</Title>
      <Message>
        Cuando otros usuarios publiquen sus ofertas, aparecerán aquí
      </Message>
      
      <CommunityIndicator>
        <UserDot>👋</UserDot>
        <UserDot delay="0.3">✋</UserDot>
        <UserDot delay="0.6">🛒</UserDot>
      </CommunityIndicator>
      
      <HintText>¡Las ofertas pueden aparecer en cualquier momento!</HintText>
    </WaitingContainer>
  );
}