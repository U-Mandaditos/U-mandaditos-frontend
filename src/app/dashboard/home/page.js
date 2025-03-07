'use client'
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Title from "@/app/ui/essentials/Title";
import Header from "@/app/ui/utilities/Header";
import LocationSelect from "@/app/ui/utilities/LocationSelect";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import Image from "/public/img/image-home.svg"
import DeliveryCard from "@/app/ui/cards/DeliveryCard";

const UserImage = styled.img`
    width: 43px;
    height: 43px;
    border-radius: 100%;
    object-fit: cover;
`;

const Card = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.colors.primaryLight};
    height: 125px;
    width: 100%;
    flex-direction: row;
    border-radius: 10px;
    padding: 15px;
`;

const Icon = styled.svg`
  width: ${(props) => props.width || '35%'};
  height: auto;
`;

const data = {
    userName: "Odir",
    userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s",
    locations: [
        {
            key: 1,
            name: "B2"
        },
        {
            key: 2,
            name: "Polideportivo"
        }
    ],
    deliverys: [
        {
            pickUpLocation: "B2",
            deliveryLocation: "Polideportivo",
            deliveryHour: "3:00 pm",
            deliveryTitle: "Alitas del CC",
            runnerName: "Angel Fernando Castillo",
            status: 1,
            price: "L 20.00"
        },
        {
            pickUpLocation: "B2",
            deliveryLocation: "Polideportivo",
            deliveryHour: "3:00 pm",
            deliveryTitle: "Alitas del CC",
            runnerName: "Angel Fernando Castillo",
            status: 2,
            price: "L 20.00"
        }
    ]
}


export default function Home() {
    const theme = useTheme();

  return (
    <>
    <FlexContainer className="p-5" direction="column" gap="30px">
        <FlexContainer direction="row">
            <FlexContainer direction="column">
                <Title text={`Hola ${data.userName}`} />
                <Paragraph text={"Bienvenido a U-mandaditos"} color={theme.colors.secondaryText}/>
            </FlexContainer>
            <UserImage src={data.userImage} />
        </FlexContainer>

        <LocationSelect text={"¿Donde estas?"} optionList={data.locations}/>

        <Card>
            <FlexContainer direction="column" width="70%" gap={"1px"}>
                <Paragraph text={"¿Quieres postear"} size={"12px"}/>
                <Title text={"Un mandadito?"} size={"20px"} weight={"500"}/>
                <Paragraph text={"Sientate y encuentra el mejor runner."} size={"10px"} color={theme.colors.secondaryText}/>
                <Button text={"Crea un mandadito"} width={"75%"} fontSize={"10px"} paddingx={"3px"} paddingy={"8px"} className={"mt-2"}/>
            </FlexContainer>
            <Icon as={Image} />
        </Card>

        <FlexContainer direction="column" gap="5px">
            <Title text={"Tus mandaditos posteados"} weight={"450"} size={"20px"} className={"mb-2"}/>
            {data.deliverys.map((delivery) =>
                <DeliveryCard 
                    pickUpLocation={delivery.pickUpLocation} 
                    deliveryLocation ={delivery.deliveryLocation}
                    deliveryHour={delivery.deliveryHour} 
                    deliveryTitle={delivery.deliveryTitle}
                    runnerName={delivery.runnerName}
                    status={delivery.status}
                    price={delivery.status}/>
            )} 
        </FlexContainer>
        
        <FlexContainer direction="column" gap="5px">
            <Title text={"Encuentra mandaditos cerca de ti"} weight={"450"} size={"20px"} className={"mb-2"}/>
            <img src="/img/img-map.png"></img>
        </FlexContainer>

    </FlexContainer>
    
      
    </>
  );
}