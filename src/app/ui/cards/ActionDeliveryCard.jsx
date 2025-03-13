import styled, { useTheme } from 'styled-components';
import { FlexContainer } from '../essentials/FlexBox';
import RunnerIcon from "/public/img/runner-icon.svg";
import Next from "/public/img/play-arrow.svg";
import Location from "/public/img/location-icon.svg";
import Acces from "/public/img/acces-arrow.svg"

const ContainerGeneral = styled.div`
    width: auto;
    height: min-content;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.lineColor};
    background-color: ${(props) => props.$isselected?  props.theme.colors.secondaryLight: props.theme.colors.main};
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: space-between;
`;

const OutContainer = styled.div`
    width: auto;
    height: min-content;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.secondary};
    display: flex;
    flex-direction: column;
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
    white-space: ${(props) => props.inline === 'yes'? 'nowrap': 'normal'};
`;

const SecondContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 50%;
    border-radius: 10px;
`;

export default function ActionDeliveryCard ({idDelivery, pickUpLocation, deliveryLocation, deliveryHour, deliveryTitle, posterName, price, isSelected, onClick, action }) {
    const theme = useTheme();
    return (
        <>
            <OutContainer onClick={onClick}>
                <ContainerGeneral $isselected={isSelected}>
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
                            <TextCard weight="500">{deliveryTitle}</TextCard>
                        </FlexContainer>
                        <FlexContainer direction="row" gap="4px">
                            <TextCard weight="500" inline="yes">Publicado por:</TextCard>
                            <TextCard>{posterName}</TextCard>
                        </FlexContainer>

                    </FlexContainer>
                    <FlexContainer direction="column" alignitems="flex-start" gap="3px" width="auto">
                        <TextCard color={theme.colors.foreground} weight="500" size="16px">{`L ${price} `}</TextCard>
                        <TextCard color={theme.colors.secondaryText} weight="400" size="12px">{deliveryHour}</TextCard>
                    </FlexContainer>

                </ContainerGeneral>
                {isSelected && (
                    <SecondContainer className='p-2' onClick={action}>
                        <TextCard weight="500" inline="yes" color={theme.colors.main} size="14px">¿Quiere hacer una contraoferta?</TextCard>
                        <Icon color={theme.colors.main} as={Acces} width="9px"/>
                    </SecondContainer>
                )}
            </OutContainer>
        </>
    )
}