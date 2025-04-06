import styled from "styled-components";
import Title from "../essentials/Title";
import { theme_orange } from "@/app/styles/theme";

const Subtitle = styled.h2`
  font-size: ${(props) => props.size || '18px'};
  font-weight: ${(props) => props.weight || 'bold'};
  color: ${(props) => props.color || props.theme.colors.foreground};
  margin-bottom: 8px;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${(props) => props.color || props.theme.colors.foreground};
  margin-top: 10px;
  margin-bottom: 16px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transform: ${({ $isVisible }) => ($isVisible ? "scale(1)" : "scale(0.8)")};
  transition: transform 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: ${(props)=> props.theme.colors.primary};
  }
`;

export default function Modal({ children, isOpen, onClose, title, subtitle, showClose = true }) {
  return (
    <Backdrop $isVisible={isOpen} onClick={onClose}>
      <ModalContainer $isVisible={isOpen} onClick={(e) => e.stopPropagation()}>

        {showClose && <CloseButton onClick={onClose}>✕</CloseButton>}

        {title && <Title text={title} />}

        {subtitle && <>
          <Subtitle size={"1rem"} weight={"500"} color={theme_orange.colors.secondaryText}>
            {subtitle}
          </Subtitle>
        </>
        }
        <Divider color={theme_orange.colors.secondaryText} />
        {children}
      </ModalContainer>
    </Backdrop>
  );
};