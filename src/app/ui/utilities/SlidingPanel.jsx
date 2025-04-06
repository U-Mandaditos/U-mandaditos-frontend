import { useState, useRef, Children } from "react";
import styled from "styled-components";
import Paragraph from "../essentials/Paragraph";

const MenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(${(props) => props.translatey}px);
  transition: transform 0.3s ease-out;
  touch-action: none;
`;

const DragHandle = styled.div`
  width: 50px;
  height: 5px;
  background: ${(props)=> props.theme.colors.lineColor};
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: grab;
`;

const MenuContent = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${(props)=> props.theme.colors.lineColor};
`

export default function ({children, title}){
  const MaxLimit = 700; //Limite maximo inferior
  const MinLimit = 0; //Limite maximo superior
  const [translateY, setTranslateY] = useState(MaxLimit); // Inicia cerrado
  const startY = useRef(MinLimit); // Guarda la posición inicial del touch
  const currentY = useRef(MaxLimit); // Guarda la posición actual
  const isDragging = useRef(false);

  // Se activa cuando el usuario toca la pantalla
  const handleTouchStart = (e) => {
    if (e.target === e.currentTarget || e.target.closest('.drag-handle')) {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
    }
  };

  // Se activa cuando el usuario arrastra el menú
  const handleTouchMove = (e) => {
    const moveY = e.touches[0].clientY - startY.current;
    const newTranslateY = Math.max(MinLimit, Math.min(MaxLimit, currentY.current + moveY)); //Limita el arrastre del mouse
    setTranslateY(newTranslateY);
  };

  // Se activa cuando el usuario suelta el menú
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    const quarter = MaxLimit / 4;
    const half = MaxLimit / 2;
    
    let newPosition = currentY.current; // Mantiene posición por defecto
    
    if (translateY < quarter) {
      newPosition = MinLimit;
    } else if (translateY < half) {
      newPosition = half;
    } else if (translateY > half + quarter) {
      newPosition = MaxLimit;
    }
    
    setTranslateY(newPosition);
    currentY.current = newPosition;
  };

  

  return (
    <MenuContainer
      translatey={translateY}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <DragHandle className="mt-3"/>
      <Paragraph text={title} weight={500} className={'mb-2'}></Paragraph>
      <Divider/>
      <MenuContent>
        {children}
      </MenuContent>
    </MenuContainer>
  );
};