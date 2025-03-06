import styled from "styled-components"

const Container = styled.div`
    width: fit-content;
    background-color: ${(props) => props.color || props.theme.colors.secondaryLight};
    padding: 8px;
    display: flex;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid ${({theme})=> theme.colors.lineColor};
`
const Icon = styled.svg`
  width: ${(props)=> props.size || "20px"};
  height: auto;
  path {
    fill: ${(props) => props.iconcolor || props.theme.colors.foreground}; 
  }
`;

export default function IconTextCard({icon: SvgIcon, img, text, color, iconColor, iconSize}){
    return (<Container color={color}>
        {SvgIcon && <Icon as={SvgIcon} iconcolor={iconColor} iconSize={iconSize}/>}
        {text}
    </Container>)
}