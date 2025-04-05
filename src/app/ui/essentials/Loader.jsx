import React from 'react';
import styled, { keyframes } from 'styled-components';

// Definición de la animación
const bblFadInOut = keyframes`
  0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em; }
  40% { box-shadow: 0 2.5em 0 0; }
`;

// Contenedor que ocupa todo el alto disponible
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${props => props.offset || '0px'});
  width: 100%;
`;

// Componente del loader
const StyledLoader = styled.span`
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: ${bblFadInOut} 1.8s infinite ease-in-out;
  color: ${(props) => props.theme.colors.primary};
  font-size: 7px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${bblFadInOut} 1.8s infinite ease-in-out;
  }

  &:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }

  &:after {
    left: 3.5em;
  }
`;

const LoadingSpinner = ({ offset }) => {
  return (
    <LoaderContainer offset={offset}>
      <StyledLoader ></StyledLoader>
    </LoaderContainer>
  );
};

export default LoadingSpinner;