import React from "react";
import styled, { keyframes } from "styled-components";

// Animación de movimiento de la barra de carga
const move = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

// Contenedor de la barra de carga
const BarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${({theme})=> theme.colors.primaryLight};
  overflow: hidden;
  position: relative;
  border-radius: 5px;
`;

// Elemento animado que simula la carga
const Bar = styled.div`
  width: 50%;
  height: 100%;
  background: ${({theme})=> theme.colors.primary};
  position: absolute;
  animation: ${move} 1.5s infinite linear;
  border-radius: 5px;
`;

const LoadingBar = ({move}) => {
  return (
    <BarContainer>
      <Bar />
    </BarContainer>
  );
};

export default LoadingBar;
