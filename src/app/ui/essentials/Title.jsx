import styled from 'styled-components';

const Title_ = styled.h1`
  font-size: ${(props) => props.size || '24px'};
  color: ${(props) => props.color || props.theme.colors.foreground}; 
  font-weight: bold;
  padding: 0;
  overflow-wrap: break-word;
  font-weight: ${(props) => props.weight || 700};
`;

export default function Title({ size, text, color, className, weight }) {
  return <Title_ size={size} color={color} className={className} weight={weight}>{text}</Title_>;
};
