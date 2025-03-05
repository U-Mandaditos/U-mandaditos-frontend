import styled from 'styled-components';
import { FlexContainer } from '../essentials/FlexBox';

const ContainerGeneral = styled.div`
    width: auto;
    height: 110px;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.lineColor};
    background-color: transparent;
    display: flex;
    flex-direction: row;
`;

const RContainer = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;


export default function DeliveryCard ({}) {
    return (
        <ContainerGeneral>

        </ContainerGeneral>
    )
}