'use client'

import Title from '../essentials/Title';
import BackButton from '../navigation/BackButton';
import { FlexContainer } from '../essentials/FlexBox';
import styled from 'styled-components';

const StyledFlexContainer = styled.div`
    background: ${(props) => props.theme.colors.background || 'white'};
    text-align: center;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

export default function Header({text, router}){
  
    return (
        <StyledFlexContainer className={"p-4"}>  
            <BackButton router={router} width={"16px"} heigth={"16px"}/>
            <Title size={"24px"} text={text} color={"black"} className={""} weight={"600"}/>
        </StyledFlexContainer>
    );
};