import styled from "styled-components";

const LocationSelectContainer = styled.div`
    width: 100%;
    padding: .3rem .7rem;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.primaryLight };
    color: ${(props) => props.theme.colors.secondaryText };
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
`;

const LocationInfo = styled.div`
    display: flex;
    align-items: center;
    margin-left: 7px;
    gap: .5rem;
`;


const SelectContainer = styled.div`
    width: 50%;
    background-color: ${(props) => props.theme.colors.background };
    display: flex;
    border-radius: 10px;
    padding: 0 .5rem;
`;

const SelectIcon = styled.img`
    width: 1.3rem;
`;

const ContainerIcon = styled.img`
    width: 1.1rem;
`;

const Select = styled.select`
    background-color: transparent;
    padding: .5rem;
    border: none;
    width: 90%;
    outline: none;
    color: ${(props) => props.theme.colors.secondaryText };
    font-size: 1rem;


`;

export default function LocationSelect({text, optionList, onChange, name}){
    return (
        <LocationSelectContainer>
            <LocationInfo>
                <ContainerIcon src="/icons/magnifying_glass.svg" alt="lupa" />
                <p>{text}</p>
            </LocationInfo>
            <SelectContainer>
                <SelectIcon src="/icons/ubication.svg" alt="ubicacion" />
                <Select name={name} onChange={onChange}>
                    {optionList.map((option) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </Select>
            </SelectContainer>
        </LocationSelectContainer>
    )
}