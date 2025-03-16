'use client'

import styled from 'styled-components';
import TitleHeader from "../ui/utilities/TitleHeader"
import Input from "../ui/essentials/Input"
import Select from "../ui/essentials/Select"
import Button from "../ui/essentials/Button"
import Paragraph from "../ui/essentials/Paragraph"
import Link from "../ui/essentials/Link"
import { FlexContainer } from '../ui/essentials/FlexBox';
import { useTheme } from 'styled-components';

const optionsList = [
    { id: 1, name: "Ingeniería en Sistemas" },  
    { id: 2, name: "Ingeniería Civil" },        
    { id: 3, name: "Ingeniería Eléctrica" }
];

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
            <TitleHeader title={"Crea una cuenta"} text={"Completa tus datos personales para empezar"} />
            <StyledForm>
                <Input label={"Nombre Completo"} name={"name"} required={false} type={"text"} width={"324px"} placeholder="e.g Daniel Alexander Ochoa"/>
                <Input label={"Correo"} name={"email"} required={false} type={"email"} width={"324px"} placeholder="e.g dochoao@gmail.com" />
                <Input label={"Fecha de Nacimiento"} name={"dateOfBirth"} required={false} type={"date"} width={"324px"} placeholder="DD/MM/YYYY" />
                <Select label={"Carrera"} name={"career"} required={false} width={"324px"} optionsList={optionsList} defaultOption={"Seleccione"} />
                <Input label={"Contraseña"} name={"password"} type={"password"} required={false} width={"324px"} placeholder="Crea una contraseña segura" />
                <Input label={"Confirmar contraseña"} name={"confirmPassword"} type={"password"} required={false} width={"324px"} placeholder="Confirma tu contraseña" />
                <Input label={"Foto de perfil"} name={"profilePic"} type={"file"} required={false} width={"324px"} placeholder="Sube tu foto" />
                <FlexContainer width="100%" justifycontent={"center"} alignitems={"center"}>
                    <Button borderRadius={"30px"} width={"300px"} text={"Registrar"} />
                </FlexContainer> 
                <FlexContainer width="100%" justifycontent={"center"} alignitems={"center"} gap="5px" >
                    <Paragraph color={theme.colors.secondaryText} weight={"600"} size={"13px"} text={"¿Ya tienes una cuenta?"} />
                    <Link href="/login" text={"Inicia Sesión"} color={theme.colors.primary} size={"13px"} weight={"600"} float={"none"} />
                </FlexContainer>
            </StyledForm>
        </>
        
    );
};