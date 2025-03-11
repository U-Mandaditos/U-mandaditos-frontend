'use client'

import styled from 'styled-components';
import AuthenticationHeader from "../ui/utilities/AuthenticationHeader"
import Title from "../ui/essentials/Title"
import Input from "../ui/essentials/Input"
import Select from "../ui/essentials/Select"
import Button from "../ui/essentials/Button"
import Paragraph from "../ui/essentials/Paragraph"
import Link from "../ui/essentials/Link"
import { FlexContainer } from '../ui/essentials/FlexBox';

const optionsList = [
    { id: 1, name: "Ingeniería en Sistemas" },  
    { id: 2, name: "Ingeniería Civil" },        
    { id: 3, name: "Ingeniería Eléctrica" }
];

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 2rem;
    padding: 2rem;
`;

export default function Page() {
    return (
        <>
            <AuthenticationHeader title={"Crea una cuenta"} text={"Completa tus datos personales para empezar"} />
            <StyledForm className="p-5">
                <div> 
                    <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Nombre Completo" />
                    <Input name={"name"} required={false} type={"text"} width={"324px"} placeholder="e.g Daniel Alexander Ochoa"/>
                </div>
                <div> 
                    <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Correo" />
                    <Input name={"email"} required={false} type={"email"} width={"324px"} placeholder="e.g dochoao@gmail.com" />
                </div>
                <div> 
                    <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Fecha de nacimiento" />
                    <Input name={"dateOfBirth"} required={false} type={"date"} width={"324px"} placeholder="DD/MM/YYYY" />
                </div>
                <div> 
                    <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Carrera" />
                    <Select name={"career"} required={false} width={"324px"} optionsList={optionsList} defaultOption={"Seleccione"} />
                </div>
                <div>
                    <Title className={"mb-2 mt-2"} weight={"strong"} size={"medium"} text="Contraseña" />
                    <Input name={"password"} type={"password"} required={false} width={"324px"} placeholder="Crea una contraseña segura" />
                </div>  
                <div>
                    <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Confirmar contraseña" />
                    <Input name={"confirmPassword"} type={"password"} required={false} width={"324px"} placeholder="Confirma tu contraseña" />
                </div>  
                <div> 
                    <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Foto de perfil" />
                    <Input name={"profilePic"} type={"file"} required={false} width={"324px"} placeholder="Sube tu foto" />
                </div>
                <FlexContainer width="100%" justifycontent={"center"} alignitems={"center"}>
                    <Button borderRadius={"30px"} width={"300px"} text={"Registrar"} />
                </FlexContainer> 
                <FlexContainer width="100%" justifycontent={"center"} alignitems={"center"} gap="5px" >
                    <Paragraph color={(props) => props.theme.colors.secondaryText} weight={"600"} size={"13px"} text={"¿Ya tienes una cuenta?"} />
                    <Link href="/login" text={"Inicia Sesión"} color={(props) => props.theme.colors.primary} size={"13px"} weight={"600"} float={"none"} />
                </FlexContainer>
            </StyledForm>
        </>
        
    );
};