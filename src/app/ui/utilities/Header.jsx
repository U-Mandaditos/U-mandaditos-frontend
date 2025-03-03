'use client'

import Title from '../essentials/Title';
import BackButton from '../navigation/BackButton';
import { FlexContainer } from '../essentials/FlexBox';
import styled from 'styled-components';

const StyledFlexContainer = styled(FlexContainer)`
    background: ${(props) => props.theme.colors.background || 'white'};
    text-align: center;
`;

export default function Header({text, router}){
  
    return (
        <StyledFlexContainer direction={"column"} justifycontent={"end"} height={"100px"} className={"p-4"}>  
            <BackButton router={router} width={"16px"} heigth={"16px"}/>
            <Title size={"24px"} text={text} color={"black"} className={""} weight={"600"}/>
        </StyledFlexContainer>
    );

};