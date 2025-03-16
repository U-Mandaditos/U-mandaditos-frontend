'use client'

import styled, { useTheme } from 'styled-components';
import Button from "../ui/essentials/Button"
import { FlexContainer} from "../ui/essentials/FlexBox"
import Input from "../ui/essentials/Input"
import Paragraph from "../ui/essentials/Paragraph"
import Title from "../ui/essentials/Title"
import Link from "../ui/essentials/Link"
import TitleHeader from "../ui/utilities/TitleHeader"

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
`;

export default function Page() {
    const theme = useTheme();
    return (
        <>
            <TitleHeader title={"Inicia sesión"} text={"Bienvenido de vuelta a U-Mandaditos"} />
            <StyledForm>
                <Input label={"Correo"} name={"email"} required={false} type={"email"} width={"314px"} placeholder="e.g afcastillof@unah.hn" />
                <div>
                    <Input label={"Contraseña"} name={"password"} type={"password"} required={false} width={"314px"} placeholder="Ingresa tu contraseña" />
                    <Link text={"¿Olvidaste tu contraseña?"} color={theme.colors.secondaryText} size={"13px"} weight={"400"} float={"right"} href={"#"} />
                </div>   
                <FlexContainer direction="column" alignitems="center">
                    <Button borderRadius={"30px"} width={"300px"} text={"Iniciar sesión"} />
                </FlexContainer>   
                <FlexContainer direction="row" alignitems={"center"} justifycontent="center" gap="5px">
                    <Paragraph color={theme.colors.secondaryText} weight={"600"} size={"13px"} text={"¿Todavía no tienes una cuenta?"}/> 
                    <Link href="/register" text={"Regístrate"} color={theme.colors.primary} size={"13px"} weight={"600"} float={"none"} />
                </FlexContainer>      
            </StyledForm>
        </>
    );
}