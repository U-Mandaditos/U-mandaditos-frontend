import styled from "styled-components";

const ParagraphStyled = styled.p`
  font-size: ${props => props.size || '1rem'}; 
  font-weight: ${props => props.weight || 'normal'};
  color: ${props => props.color || props.theme.colors.secondaryText};
`;

export default function Paragraph({children,size,weight,color, className}){
    return(<ParagraphStyled size={size} weight={weight} color={color} className={className}>{children}</ParagraphStyled>);
}