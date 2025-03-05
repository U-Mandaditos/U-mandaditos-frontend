import styled from "styled-components";

const StyledText = styled.p`
    font-size: 13px;
    weight: 500; 
`;

const StyledDiv = styled.div`
    position: relative;
    width: 220px;
    display: inline-block;
    padding: 10px;
    background-color: ${(props) => ( props.isMine ? props.theme.colors.primary || '#D3624B' : props.theme.colors.secondaryLight || '#E4EFEE')};
    color:  ${(props) => ( props.isMine ? props.theme.colors.main || 'white' : props.theme.colors.foreground || '#363433')};
    border-radius: 10px;
    margin: 10px 0;
    float: ${(props) => ( props.isMine ? 'right' : 'left')};

    &::before {
        content: ' ';
        position: absolute;
        left: ${props => ( props.isMine ? 'auto' : '-15px')};
        right: ${props => ( props.isMine ? '-15px' : 'auto')};
        top: auto;
        bottom: 0px;
        border: 22px solid;
        border-color: transparent ${(props) => ( props.isMine ? props.theme.colors.primary || '#D3624B' : props.theme.colors.secondaryLight || '#E4EFEE')} transparent transparent;
        transform: rotate(${(props) => ( props.isMine ? '100' : '85')}deg);
    }
`;

const StyledHour = styled.span`
    font-size: 12px;    
    float: right;
    weight: 400;
    position: relative;
    z-index: 2;
`;

export default function ChatMessage({ text, hour, isMine }) {
    return (
        <>
            <StyledDiv isMine={isMine}>
                <StyledText>{text}</StyledText>
                <StyledHour>{hour}</StyledHour>
            </StyledDiv>
        </>    
    );
}