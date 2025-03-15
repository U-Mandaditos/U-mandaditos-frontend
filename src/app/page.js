'use client'
import Title from "./ui/essentials/Title";
import Paragraph from "./ui/essentials/Paragraph";

import Button from "./ui/essentials/Button";
import styled, { useTheme } from "styled-components";
import { FlexContainer, FlexItem } from "./ui/essentials/FlexBox";

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1.5rem;
  background-color: ${(props) => props.theme.colors.primaryLight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PalmThree = styled.img`
  z-index: 0;
  position: absolute;
  top: ${(props) => props.top || ''};
  bottom: ${(props) => props.bottom || ''};
  left: ${(props) => props.left || ''};
  right: ${(props) => props.right || ''};
  transform: translateX(${(props) => props.rotation || '20deg'});
  width: ${(props) => props.width || 'auto'};
`;

const MainImage = styled.img`
  z-index: 10;
  width: 110%;
`;


export default function Home() {
  const theme = useTheme();

  const handleRegisterClick = () => {
    router.push("/register")
  }

  return (
    <PageContainer>
      <PalmThree src="/img/palm_tree_right.png" alt="palmera" width={"60%"} top={'30%'} right={'0'}/>
      <PalmThree src="/img/palm_tree_left.png" alt="palmera" width={"40%"} top={'50%'} left={'0'}/>

      <div>
        <Title text={"Conectamos pasos, simplificamos tu dia"} size={'3.5rem'}/>

        <Paragraph text={"Pedidos que caminan contigo, pero sin ti. Pide cosas y alguien mas te las ira a dejar."} color={theme.colors.secondaryText}/>
      </div>

      <FlexContainer direction={'column'} alignitems={'center'} gap={'25px'}>
        <MainImage src="/img/puma_logo.png" alt="Puma Entregando Orden" />
        <Button text={"Registrarse"} onClick={handleRegisterClick} width={'90%'} borderRadius={'20px'} paddingy={'12px'}/>
        <FlexContainer gap={'5px'} justifycontent={'center'}>
            <Paragraph text={"¿Ya tienes una cuenta? puedes"} color={theme.colors.secondaryText} />
            <a href="/about"><Paragraph text={"Iniciar sesión"} color={theme.colors.primary} /></a> 
        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  );
}