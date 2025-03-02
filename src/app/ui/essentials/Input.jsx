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
`;

const StyledInput = styled.input`
  height: 40px;
  font-size: 16px;
  padding: 8px;
  border: 1.4px solid ${(props) => props.theme.colors.lineColor || '#d9d9d9'}; 
  border-radius: 8px;
  background-color: transparent; 
  outline: none;
  transition: border 0.3s ease;
  color: ${(props) => props.theme.colors.foreground || '#fff'};

  &:focus {
    border-color: ${(props) => props.theme.colors.primary || '#f8f8f8'};
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[required]:invalid {
    border-color: red;
  }
`;

export default function Input({ width, label, placeholder, value, onChange, name, required, type, className, ref, defaultValue, accept}){
  return (
    <InputWrapper className={className} width={width}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <StyledInput
        defaultValue={defaultValue}
        ref={ref}
        type={type || 'text'} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept}
      />
    </InputWrapper>
  );
};
