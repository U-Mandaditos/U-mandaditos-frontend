import styled from 'styled-components';

const StyledButton = styled.button`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  padding: ${(props) => `${props.paddingy || '10px'} ${props.paddingx || '20px'}`};
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: 500;
  font-family: ${(props) => props.theme.typography.fontFamily};
  border: none;
  border-radius: ${(props) => props.borderadius || "6px"};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => props.textColor || props.theme.colors.main};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.tertiary
      : props.color || props.theme.colors.primary}; 
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.colors.tertiary
        : props.theme.colors.foreground}; 
  }
`;

export default function Button({
  width,
  text,
  value,
  onClick,
  color,
  textColor,
  type = 'button',
  disabled = false,
  paddingx,
  paddingy,
  className,
  fontSize,
  height,
  borderRadius
}) {
  return (
    <StyledButton
      width={width}
      paddingx={paddingx}
      paddingy={paddingy}
      color={color}
      textColor={textColor}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      fontSize={fontSize}
      height={height}
      borderadius={borderRadius}
    >
      {text || value} 
    </StyledButton>
  );
}
