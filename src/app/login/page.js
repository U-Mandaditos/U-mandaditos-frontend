'use client'

import styled, { useTheme } from 'styled-components';
import Button from "../ui/essentials/Button"
import { FlexContainer } from "../ui/essentials/FlexBox"
import Input from "../ui/essentials/Input"
import Paragraph from "../ui/essentials/Paragraph"
import Link from "../ui/essentials/Link"
import TitleHeader from "../ui/utilities/TitleHeader"
import { validateEmail } from '../utils/validators';
import { useState } from 'react';

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
    const [isLogin, setIsLogin] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [logginError, setLogginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLogin(true);
        setEmailError('');

        let emError = validateEmail(email)

        if (emError) {
            setEmailError(emError)
            setIsLogin(false)
            return
        }

        try {
            // Aquí se procesa el inicio de sesión, esto solo es código de prueba
            setTimeout(() => {
                console.log('Logged in');
                setIsLogin(false)
            }
                , 2000);

        } catch (err) {
            setIsLogin(false)
            setLogginError(err.message || 'Error en el inicio de sesión')
        }
    }

    return (
        <>
            <TitleHeader title={"Inicia sesión"} text={"Bienvenido de vuelta a U-Mandaditos"} />
            <StyledForm onSubmit={handleSubmit}>
                <Input onChange={e => setEmail(e.target.value)} label={"Correo"} value={email} name={"email"} required={true} type={"email"} width={"314px"} placeholder="e.g afcastillof@unah.hn" />
                {emailError && <Paragraph color="red" size="14px" text={emailError} />}
                <div>
                    <Input onChange={e => setPassword(e.target.value)} label={"Contraseña"} value={password} name={"password"} type={"password"} required={true} width={"314px"} placeholder="Ingresa tu contraseña" />
                    <Link text={"¿Olvidaste tu contraseña?"} color={theme.colors.secondaryText} size={"13px"} weight={"400"} float={"right"} href={"/forgot-password"} />
                </div>
                <FlexContainer direction="column" alignitems="center">
                    <Button disabled={isLogin} type='submit' borderRadius={"30px"} width={"300px"} text={isLogin ? 'Iniciando Sesión...' : 'Iniciar Sesión'} />
                </FlexContainer>
                {logginError && <Paragraph color="red" size="14px" text={logginError} />}
                <FlexContainer direction="row" alignitems={"center"} justifycontent="center" gap="5px">
                    <Paragraph color={theme.colors.secondaryText} weight={"600"} size={"13px"} text={"¿Todavía no tienes una cuenta?"} />
                    <Link href="/register" text={"Regístrate"} color={theme.colors.primary} size={"13px"} weight={"600"} float={"none"} />
                </FlexContainer>
                <FlexContainer direction="row" alignitems={"center"} justifycontent="center" gap="5px">
                    <Paragraph color={theme.colors.secondaryText} weight={"600"} size={"13px"} text={"Regresar a "} />
                    <Link href="/" text={"la página principal"} color={theme.colors.primary} size={"13px"} weight={"600"} float={"none"} />
                </FlexContainer>
            </StyledForm>
        </>
    );
}