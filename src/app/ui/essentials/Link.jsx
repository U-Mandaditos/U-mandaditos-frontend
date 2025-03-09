import styled from 'styled-components';

// Componente estilizado con styled-components
const StyledLink = styled.a`
    color: ${(props) => props.color || props.theme.colors.primary};
    font-size: ${(props) => props.size || '13px'};
    font-weight: ${(props) => props.weight || 'normal'};
    float: ${(props) => props.float || 'none'};
    text-decoration: none;
`;

export default function Link({ text, color, size, weight, float, href }) {
    return (
        <StyledLink href={href} color={color} size={size} weight={weight} float={float}>
            {text}
        </StyledLink>
    );
}
