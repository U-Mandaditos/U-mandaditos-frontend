import styled from "styled-components";

const StyledContainer = styled.div`   
        background: ${(props) => props.theme.colors.main || 'white'};
        font-size: 16px;
        weight: 500;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
`;

const StyledDiv = styled.div`
    width: 60%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px;
`;

const IconContainer = styled.div`
    background: ${(props) => props.theme.colors.lineColor || '#ECECEC'};
    border-radius: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

export default function AccessButton({ text, Action, icon }) {
    return (
        <StyledContainer onClick={Action}>
            <StyledDiv>
                <IconContainer style={{width: "33px", height: "33px"}} className="mr-3">
                    <img src={icon} alt={icon} />
                </IconContainer>
                <p>{text}</p>
            </StyledDiv>
            <IconContainer style={{width: "18px", height: "18px"}}>
                <img src="/img/rightArrow.svg" alt="rightArrow" />
            </IconContainer>
        </StyledContainer>
    );
}