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
import { useState } from 'react';
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from '../utils/validators';

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

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ dateOfBirth, setDateOfBirth ] = useState('');
    const [ career, setCareer ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ profilePic, setProfilePic ] = useState('');
    const [ errors, setErrors ] = useState( {} );
    const [ isRegistring, setIsRegistring ] = useState(false);

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setIsRegistring(true);

        // validations
        let nameError = validateName(name);
        let emailError = validateEmail(email);
        let passwordError = validatePassword(password);
        let confirmPassError = validateConfirmPassword(password, confirmPassword);

        const newErrors = {};

        if (nameError) newErrors.name = nameError;
        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;
        if (confirmPassError) newErrors.confirmPassword = confirmPassError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsRegistring(false);
            return;
        }

        try {
            // Aquí iría la lógica de registro... Estas líneas son de prueba...
            setTimeout(() => {
                setIsRegistring(false);
            }, 2000);

            setErrors({});

        } catch (error) {
            setErrors({
                ...newErrors,
                registerError: error.message || 'Ocurrió un error al intentar registrar'
            })
            setIsRegistring(false);
        }
    }

    return (
        <>
            <TitleHeader title={"Crea una cuenta"} text={"Completa tus datos personales para empezar"} />
            <StyledForm onSubmit={handleSubmit}>
                <Input label={"Nombre Completo"} value={name} onChange={e => setName(e.target.value)} name={"name"} required={true} type={"text"} width={"324px"} placeholder="e.g Daniel Alexander Ochoa"/>
                { errors.name && <p style={ { color:"red", size:"14px", float:"left"} }> { errors.name} </p> }
                <Input label={"Correo"} name={"email"} value={email} onChange={ e => setEmail( e.target.value )} required={true} type={"email"} width={"324px"} placeholder="e.g dochoao@gmail.com" />
                { errors.email && <p style={ { color:"red", size:"14px", float:"left"} }> { errors.email } </p> }
                <Input label={"Fecha de Nacimiento"} value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} name={"dateOfBirth"} required={true} type={"date"} width={"324px"} placeholder="DD/MM/YYYY" />
                <Select label={"Carrera"} name={"career"} value={career} onChange={e => setCareer(e.target.value)} required={true} width={"324px"} optionsList={optionsList} defaultOption={"Seleccione"} />
                <Input label={"Contraseña"} name={"password"} value={password} onChange={e => setPassword(e.target.value)} type={"password"} required={true} width={"324px"} placeholder="Crea una contraseña segura" />
                { errors.password && <p style={ { color:"red", size:"14px", float:"left"} }> { errors.password } </p> }
                <Input label={"Confirmar contraseña"} name={"confirmPassword"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type={"password"} required={true} width={"324px"} placeholder="Confirma tu contraseña" />
                { errors.confirmPassword && <p style={ { color:"red", size:"14px", float:"left"} }> { errors.confirmPassword } </p> }
                <Input label={"Foto de perfil"} name={"profilePic"} value={profilePic} onChange={e => setProfilePic(e.target.value)} type={"file"} required={true} width={"324px"} placeholder="Sube tu foto" />
                <FlexContainer width="100%" justifycontent={"center"} alignitems={"center"}>
                    <Button disabled={isRegistring} type='submit' borderRadius={"30px"} width={"300px"} text={isRegistring ? 'Registrando...' : 'Registrar'} />
                </FlexContainer> 
                <FlexContainer width="100%" justifycontent={"center"} alignitems={"center"} gap="5px" >
                    <Paragraph color={theme.colors.secondaryText} weight={"600"} size={"13px"} text={"¿Ya tienes una cuenta?"} />
                    <Link href="/login" text={"Inicia Sesión"} color={theme.colors.primary} size={"13px"} weight={"600"} float={"none"} />
                </FlexContainer>
                { errors.registerError && <p style={ { color:"red", size:"14px", float:"left"} }> { errors.registerError} </p> }
            </StyledForm>
        </>
        
    );
};