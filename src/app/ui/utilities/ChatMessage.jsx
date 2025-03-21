import styled from "styled-components";
import { FlexContainer } from "../essentials/FlexBox";

const StyledText = styled.p`
    font-size: 13px;
    weight: 500; 
`;

const StyledDiv = styled.div`
    position: relative;
    margin: ${(props)=> props.$ismine ? "10px 15px 10px 0px": "10px 0px 10px 15px"};
    width: 220px;
    display: inline-block;
    padding: 10px;
    background-color: ${(props) => ( props.$ismine ? props.theme.colors.primary || '#D3624B' : props.theme.colors.secondaryLight || '#E4EFEE')};
    color:  ${(props) => ( props.$ismine ? props.theme.colors.main || 'white' : props.theme.colors.foreground || '#363433')};
    border-radius: 10px;

    &::before {
        content: ' ';
        position: absolute;
        left: ${props => ( props.$ismine ? 'auto' : '-15px')};
        right: ${props => ( props.$ismine ? '-15px' : 'auto')};
        top: auto;
        bottom: 0px;
        border: 22px solid;
        border-color: transparent ${(props) => ( props.$ismine ? props.theme.colors.primary || '#D3624B' : props.theme.colors.secondaryLight || '#E4EFEE')} transparent transparent;
        transform: rotate(${(props) => ( props.$ismine ? '100' : '85')}deg);
    }
`;

const StyledHour = styled.span`
    font-size: 12px;    
    float: right;
    position: relative;
    z-index: 2;
`;

export default function ChatMessage({ text, hour, isMine }) {
    return (
        <FlexContainer justifycontent={isMine===true ? "flex-end" : "flex-start"}>
            <StyledDiv $ismine={isMine}>
                <StyledText>{text}</StyledText>
                <StyledHour>{hour}</StyledHour>
            </StyledDiv>
        </FlexContainer>    
    );
}