import { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    background-color: ${(props) => props.theme.colors.background};
    padding: 1rem 0;
`;

const Input = styled.input`
    width: 100%;
    padding: .8rem 2rem;
    border-radius: 30px;
    background-color: ${(props) => props.theme.colors.primaryLight};
    border: none;
    font-size: 1rem;

    &::placeholder {
        color: ${(props) => props.theme.colors.secondaryText};
    }

    &:focus {
        border: none;
        outline: none;
    }
`;

const Button = styled.button`
    display: grid;
    place-items: center;
    border: none;
    background: transparent;

    &:hover {
        transfomr: scale(1.5);
    }
`;

const Icon = styled.img`
    height: 100%;
    width: 34px;
`;

export { InputWrapper, Input, Button, Icon };



export default function SendInput({sendAction, value, handleChange}){

    return (
        <InputWrapper>
            <Input type="text" placeholder="Escribe algo..." onChange={handleChange} value={value}/>
            <Button type="button" onClick={sendAction}> <Icon src="/icons/send.svg" /></Button>
        </InputWrapper>
    )

}