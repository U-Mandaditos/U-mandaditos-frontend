import styled from 'styled-components';

const InputWrapper = styled.div`
  width: ${(props) => props.width || '100%'};
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  font-size: 15px;
  color: ${(props) => props.theme.colors.foreground || '#000'};
  margin-bottom: 8px;
  font-weight: 500;
`;

const StyledInput = styled.textarea`
  font-size: 16px;
  padding: 8px;
  border: 1.4px solid ${(props) => props.theme.colors.lineColor || '#d9d9d9'}; 
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;
  color: ${(props) => props.theme.colors.foreground || '#fff'};
  height: ${(props) => props.height || 'auto'};
  font-family: 'Roboto';


  &:focus {
    border-color: ${(props) => props.theme.colors.primary || '#f8f8f8'};
  }
`;

export default function Textarea({ width, label, placeholder, value, onChange, name, required, type, className, rows, cols, height }){
  return (
    <InputWrapper className={className} width={width}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledInput
        type={type || 'text'} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        cols={cols}
        height={height}
      >
      </StyledInput>
    </InputWrapper>
  );
};
