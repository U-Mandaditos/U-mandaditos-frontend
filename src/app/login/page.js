'use client'

import styled, { useTheme } from 'styled-components';
import Button from "../ui/essentials/Button"
import { FlexContainer } from "../ui/essentials/FlexBox"
import Input from "../ui/essentials/Input"
import Paragraph from "../ui/essentials/Paragraph"
import Link from "../ui/essentials/Link"
import TitleHeader from "../ui/utilities/TitleHeader"
import { use, useState } from 'react';
import { API_URL } from '@/app/utils/settings'
import { useRouter } from 'next/navigation';
import { validateEmail } from '../utils/validators';
import PasswordInput from '../ui/essentials/InputPassword';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    padding: 2rem;
`;

export default function Page() {
    const theme = useTheme();
    const [isLogin, setIsLogin] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [logginError, setLogginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const validatePassword = (password) => {
        if (!password) return 'La contraseña es requerida';
        if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
    };

    const loginUser = async (credentials) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        
        const data = await response.json();
        
        // Manejo de errores del backend
        if (!response.ok || data.success === false) {
            throw new Error(data.message || 'Error en el inicio de sesión');
        }
        
        // Extraer el token de donde sea que venga en la respuesta
        const token = data.idToken || data.token || data.data?.token;
        
        if (!token) {
            throw new Error('Autenticación exitosa pero no se recibió token');
        }
        
        return { idToken: token }; 
    };

      const getIPAddress = async () => {
        try {
            const res = await fetch('https://api64.ipify.org?format=json');
            const data = await res.json();
            return data.ip;
        } catch (err) {
            console.error("No se pudo obtener la IP:", err);
            return "0.0.0.0"; 
        }
    };
 
    const getDeviceInfo = () => {
        return navigator.userAgent || "Desconocido";
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) return;
    setLoading(true);
    setLogginError('');
    setIsLogin(true);

    try {
        const passwordError = validatePassword(password);
        const emailError = validateEmail(email);

        if (passwordError || emailError) {
            setLogginError(passwordError || emailError);
            return;
        }

        const ipAddress = await getIPAddress();
        const deviceInfo = getDeviceInfo();

        const { idToken } = await loginUser({ email, password, ipAddress, deviceInfo });

        localStorage.setItem('token', idToken);
        router.push('/dashboard/home');
        
    } catch (err) {
        setLogginError(
            err.message.includes('contraseña') 
                ? 'Contraseña incorrecta' 
                : 'Error en el inicio de sesión'
        );
    } finally {
        setIsLogin(false);
        setLoading(false);
    }
    };
    

    return (
        <>
            
            <TitleHeader title={"Inicia sesión"} text={"Bienvenido de vuelta a U-Mandaditos"} />
            <StyledForm onSubmit={handleSubmit}> 
                <Input 
                    onChange={e => setEmail(e.target.value)} 
                    label={"Correo"} 
                    value={email} 
                    name={"email"} 
                    required={true} 
                    type={"email"} 
                    placeholder="e.g afcastillof@unah.hn" 
                    disabled={loading}
                />
                {emailError && <Paragraph color="red" size="14px" text={emailError}/>}
                <div className='w-full'>
                    <PasswordInput 
                        onChange={e => setPassword(e.target.value)} 
                        label={"Contraseña"} 
                        value={password} 
                        name={"password"} 
                        type={"password"} 
                        required={true} 
                        placeholder="Ingresa tu contraseña" 
                        className={'mb-3'}
                        disabled={loading}
                    />
                    <Link 
                        text={"¿Olvidaste tu contraseña?"} 
                        color={theme.colors.secondaryText} 
                        size={"13px"} 
                        weight={"400"} 
                        float={"right"} 
                        href={"/forgot-password"} 
                        className="mt-4"
                    />
                </div>   
                <FlexContainer direction="column" alignitems="center">
                    <Button 
                        disabled={isLogin} 
                        type='submit' 
                        borderRadius={"30px"} 
                        width={"90%"} 
                        text={isLogin ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                    />
                </FlexContainer>   
                {logginError && <Paragraph color="red" size="14px" text={logginError}/>}
                <FlexContainer direction="row" alignitems={"center"} justifycontent="center" gap="5px">
                    <Paragraph 
                        color={theme.colors.secondaryText} 
                        weight={"600"} 
                        size={"13px"} 
                        text={"¿Todavía no tienes una cuenta?"}
                    /> 
                    <Link 
                        href="/register" 
                        text={"Regístrate"} 
                        color={theme.colors.primary} 
                        size={"13px"} 
                        weight={"600"} 
                        float={"none"} 
                    />
                </FlexContainer>    
            </StyledForm>
        </>
    );
}