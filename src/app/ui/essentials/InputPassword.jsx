import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: ${(props) => props.width || '100%'};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 15px;
  color: ${(props) => props.color || props.theme.colors.foreground || '#000'};
  margin-bottom: 8px;
  font-weight: 500;
`;

const StyledInput = styled.input`
  height: 40px;
  font-size: 16px;
  padding: 10px 40px 10px 8px; // Más padding a la derecha para el icono
  border: 1.4px solid ${(props) => props.theme.colors.lineColor || '#d9d9d9'}; 
  border-radius: 8px;
  background-color: ${(props) => props.disabled ? props.theme.colors.lineColor : 'transparent'}; 
  outline: none;
  transition: border 0.3s ease;
  color: ${(props) => props.theme.colors.foreground || '#fff'};
  width: 100%;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary || '#f8f8f8'};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 3px;
  transform: translateY(0);
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.foreground || '#666'};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

export default function PasswordInput({ 
  width, 
  label, 
  placeholder, 
  value, 
  onChange, 
  name, 
  required, 
  className, 
  ref, 
  defaultValue, 
  labelColor, 
  disabled = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputWrapper className={className} width={width}>
      {label && <InputLabel htmlFor={name} color={labelColor}>{label}</InputLabel>}
      <InputContainer>
        <StyledInput
          defaultValue={defaultValue}
          ref={ref}
          type={showPassword ? 'text' : 'password'} 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        <ToggleButton 
          type="button" 
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? <img src='/icons/eye-off.svg'/> : <img src='/icons/eye-off.svg'/>}
        </ToggleButton>
      </InputContainer>
    </InputWrapper>
  );
}