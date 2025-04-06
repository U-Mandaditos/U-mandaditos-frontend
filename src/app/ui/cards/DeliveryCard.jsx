import styled, { useTheme } from 'styled-components';
import { FlexContainer } from '../essentials/FlexBox';
import RunnerIcon from "/public/img/runner-icon.svg";
import Next from "/public/img/play-arrow.svg";
import Location from "/public/img/location-icon.svg";
import Button from '../essentials/Button';

const ContainerGeneral = styled.div`
    width: auto;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.lineColor};
    background-color: transparent;
    display: flex;
    flex-direction: row;
    padding: 8px 10px;
`;


const Icon = styled.svg`
  width: ${(props) => props.width || '14px'};
  height: auto;
  path {
    fill: ${(props) => props.color || props.theme.colors.foreground}; 
  }
`;

const Card = styled.div`
    width: auto;
    height: auto;
    display: flex;
    gap: 5px;
    background-color: ${(props) => props.color || props.theme.colors.secondary};
    border-radius: 4px;
    padding: 4px 6px 4px 6px;
    align-items: center;
    flex-direction: row;
    color: ${(props) => props.theme.colors.main};
    font-size: 10px;
    margin: 0 2px 0 2px;
`;

const TextCard = styled.span`
    font-size: ${(props) => props.size || '12px'};
    color: ${(props) => props.color || props.theme.colors.secondaryText};
    font-weight: ${(props) => props.weight || 400};
`;

const StatusCard = styled.div`
    width: min-content;
    height: auto;
    display: flex;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    padding: 2px 5px 2px 5px;
    font-weight: 400;
    color: ${(props) => 
        props.status === 1 ? props.theme.colors.tertiary :
        props.status === 2 ? props.theme.colors.secondary :
        props.theme.colors.secondaryText};
    font-size: 10px;
    margin-top: 3px;
    border: 1px solid ${(props) => 
        props.status === 1 ? props.theme.colors.tertiary :
        props.status === 2 ? props.theme.colors.secondary :
        props.theme.colors.lineColor};
`;


export default function DeliveryCard ({pickUpLocation, deliveryLocation, deliveryHour, deliveryTitle, runnerName, status, price, ActionButton }) {
    const theme = useTheme();
    const numericPrice = parseFloat(price);
    return (
        <ContainerGeneral>
            <FlexContainer width={"75%"} height="100%" direction="column" gap="2px">
                <FlexContainer height="auto" direction="row" alignitems="center" gap="5px" className='mb-2'>
                    <Icon as={RunnerIcon}></Icon>
                    <Icon as={Next} width="5px"></Icon>
                    <Card>
                        <Icon as={Location} width="10px" color={theme.colors.main}/>
                        {pickUpLocation}
                    </Card>
                    <Icon as={Next} width="5px"></Icon>
                    <Card color={theme.colors.tertiary}>
                        <Icon as={Location} width="10px" color={theme.colors.main}/>
                        {deliveryLocation}
                    </Card>
                </FlexContainer>
                <FlexContainer direction="row" gap="4px">
                    <TextCard weight="500">Mandadito:</TextCard>
                    <TextCard>{deliveryTitle}</TextCard>
                </FlexContainer>
                <FlexContainer direction="row" gap="4px">
                    <TextCard weight="500">Entrega:</TextCard>
                    <TextCard>{runnerName}</TextCard>
                </FlexContainer>
                <StatusCard status={status}>{status===2? 'En porgreso': 'En espera'}</StatusCard>

            </FlexContainer>
            <FlexContainer direction="column" alignitems="flex-end" gap="3px">
                <TextCard color={theme.colors.foreground} weight="500" size="16px">{deliveryHour}</TextCard>
                <TextCard color={theme.colors.secondaryText} weight="400" size="12px">
                    L. {numericPrice.toFixed(2)}
                    </TextCard>
                <FlexContainer alignitems="flex-end" justifycontent="flex-end" height="100%">
                    <Button text={"Ver"} width={"58%"} paddingx={"8px"} paddingy={"4px"} fontSize={"10px"} height="50%" onClick={ActionButton}></Button>
                </FlexContainer>
                
            </FlexContainer>

        </ContainerGeneral>
    )
}