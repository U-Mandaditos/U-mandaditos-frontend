'use client'
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Title from "@/app/ui/essentials/Title";
import Header from "@/app/ui/utilities/Header";
import LocationSelect from "@/app/ui/utilities/LocationSelect";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import Location from "/public/img/location-icon.svg"
import Runner from "/public/img/runner-icon.svg"
import DeliveryCard from "@/app/ui/cards/DeliveryCard";
import SlidingPanel from "@/app/ui/utilities/SlidingPanel";
import OfferCard from "@/app/ui/cards/OfferCard";
import { useRouter } from "next/navigation";


const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    position: relative;
    align-items: center;
`;

const ContainerButton = styled.div`
    position: absolute;
    bottom: 0;
    padding: 10px;
`;


const Icon = styled.svg`
  width: ${(props) => props.width || '14px'};
  height: auto;
  path {
    fill: ${(props) => props.color || props.theme.colors.foreground}; 
  }
`;

const data = {
    key: 1,
    pickUpLocation: "B2",
    deliveryLocation: "Polideportivo",
    deliveryHour: "3:00 pm",
    deliveryTitle: "Alitas del CC",
    description: "Necesito que alguien me compre unas papas frita del CC y me las traiga lo antes posible",
    runnerName: "Angel Fernando Castillo",
    status: 1,
    price: "L 20.00",
    offers: [
        {
            id: 1,
            postUser : {    
            name: "Odir",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s",
            stars: 4,
            location: "d1"
        },
        offerInfo: {
            priceOffered: "L 25.00",
            hour: "3:00 pm"
        },
        priceSuggested: "L 20.00"},
        {
            id: 2,
            postUser : {    
            name: "Odir",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s",
            stars: 1,
            location: "d1"
        },
        offerInfo: {
            priceOffered: "L 25.00",
            hour: "3:00 pm"
        },
        priceSuggested: "L 20.00"}
    ]
}


export default function Page({ params }) {
    const theme = useTheme();
    const [offerSelected, setOfferSelected] = useState(null);
    const router = useRouter();


    const selectOffer = (id) => {
        setOfferSelected(id);
    }

    const offers = (
        <Container>
        <FlexContainer direction={"column"} gap="10px">
            {
                data.offers.map((offer) => (<OfferCard
                key={offer.id}
                postUser={offer.postUser}
                offerInfo={offer.offerInfo}
                priceSuggested={offer.priceSuggested}
                isSelected={offerSelected === offer.id}
                onClick={() => selectOffer(offer.id)} />
                ))}

        </FlexContainer>
        <ContainerButton>
            <Button text={"Aceptar solicitud"}/>
        </ContainerButton>
        </Container>
    );

  return (
    <>
    <Header text={"Tu mandadito"} router={router}/> 
    <FlexContainer className="p-5" direction="column" gap="25px">
    <Title text={"Detalles"}/>
    <FlexContainer direction="column" className="ml-4" gap="15px">
        <FlexContainer direction="row">
            <FlexContainer width="20%">
                <Icon as={Location} width={"18px"}/>
            </FlexContainer>
            <Paragraph text={data.pickUpLocation} color={theme.colors.secondaryText}/>
        </FlexContainer>
        <FlexContainer direction="row">
            <FlexContainer width="20%">
                <Icon as={Runner} width={"18px"}/>
            </FlexContainer>
            <Paragraph text={data.deliveryLocation} color={theme.colors.secondaryText}/>
        </FlexContainer>
    </FlexContainer>
    <Title text={"Descripcion"}/>
    <FlexContainer direction="column" className="px-3" gap="15px">
        <Paragraph text={data.description} color={theme.colors.secondaryText}/>  
    </FlexContainer>
    <Title text={"Valor de la tarifa"}/>
    <FlexContainer direction="column" className="px-3" gap="15px">
        <Paragraph text={data.price} color={theme.colors.secondaryText} weight={"500"} size={"16px"}/>  
    </FlexContainer>


    
    </FlexContainer>
    <SlidingPanel children={offers}>

    </SlidingPanel>
      
    </>
  );
}