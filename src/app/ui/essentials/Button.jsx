import styled from 'styled-components';

const StyledButton = styled.button`
  width: ${(props) => props.width || 'auto'};
  padding: ${(props) => `${props.paddingY || '10px'} ${props.paddingx || '20px'}`};
  font-size: 16px;
  font-weight: 500;
  font-family: ${(props) => props.theme.typography.fontFamily};
  border: none;
  border-radius: 6px;
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
  paddingY,
  className
}) {
  return (
    <StyledButton
      width={width}
      paddingx={paddingx}
      paddingY={paddingY}
      color={color}
      textColor={textColor}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {text || value} 
    </StyledButton>
  );
}
