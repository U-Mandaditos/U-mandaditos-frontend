import styled from "styled-components"


const Label = styled.p`
  color: ${props => props.theme.colors.foreground};
  margin-bottom: 4px;
  font-weight: 500;
`

const SelectContainer = styled.div`
  width: ${props => props.width || "100%"};
`

const SelectStyled = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1.4px solid ${props => props.theme.colors.lineColor};
  border-radius: 8px;
  color: ${props => props.theme.colors.foreground};
  transition: border 0.3s ease;

  &:focus {
    border: 1.4px solid ${props => props.theme.colors.primary};
    outline: none;
  }

  &[required]:invalid {
    border-color: red;
  }

`;

export default function Select({label, value, onChange, defaultOption, optionsList, name, required, width}){
    return (
        <SelectContainer width={width}>
            {label && <Label>{label}</Label>}
            <SelectStyled value={value} onChange={onChange} name={name} required={required}>
                {defaultOption && <option value="">{defaultOption}</option>}
                {optionsList && optionsList.map(option=>
                    <option key={option.id} value={option.id}>{option.name}</option>)}
            </SelectStyled>
        </SelectContainer>
    )
}