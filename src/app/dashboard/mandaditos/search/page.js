'use client'
import ActionDeliveryCard from "@/app/ui/cards/ActionDeliveryCard";
import PostDeliveryCard from "@/app/ui/cards/PostDeliveryCard";
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Input from "@/app/ui/essentials/Input";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Title from "@/app/ui/essentials/Title";
import SlidingPanel from "@/app/ui/utilities/SlidingPanel";
import LoadingBar from "@/app/ui/ux/LoadingBar";
import { useState } from "react";
import { useTheme } from "styled-components";

export default function Page(){

    const [step, setStep] = useState(0);
    const [counterOffer, setCounterOffer] = useState("");
    const handleInputChange = (event) => {
        setCounterOffer(event.target.value);
      };

    const data = {
        locations: [
            {name: "B1", lat: 14.085702545109877, lng: -87.16405980974288},
            {name: "D1", lat: 14.086233263224592, lng: -87.16176920340882}
        ],
        posts: [
            {
                id: 1,
                pickupLocation: "Polideportivo",
                deliveryLocation: "B2",
                price: 20.00,
                createdAtHour: "3:23 PM",
                title: "Alitas de CC",
                description: "Necesito unas alitas del CC pero para antier.",
                posterUser: "Angel Castillo" 
            },
            {
                id: 2,
                pickupLocation: "C3",
                deliveryLocation: "B2",
                price: 20.00,
                createdAtHour: "3:23 PM",
                title: "Alitas de CC",
                description: "Necesito unas alitas del CC pero para antier.",
                posterUser: "Angel Castillo" 
            }
        ]
    }

    const [postSelected, setPostSelected] = useState({});

    const changeStep = (inputValue) => {
        if(inputValue){}
    }
    const theme = useTheme();

    const renderSteps = {
        0: (<FlexContainer direction="column" gap="20px">
            {data.posts.map(post =>
                <ActionDeliveryCard
                    key={post.id}
                    deliveryTitle={post.title}
                    pickUpLocation={post.pickupLocation}
                    deliveryLocation={post.pickupLocation}
                    deliveryHour={post.createdAtHour}
                    posterName={post.posterUser}
                    price={post.price}
                    onClick={() => { setPostSelected(post) }}
                    isSelected={post.id === postSelected?.id}
                    action={() => setStep(1)} />)}
        </FlexContainer>),
        1: (<FlexContainer direction="column" gap="20px">
            <PostDeliveryCard
                deliveryTitle={postSelected.title}
                pickUpLocation={postSelected.pickupLocation}
                deliveryLocation={postSelected.pickupLocation}
                deliveryHour={postSelected.createdAtHour}
                posterName={postSelected.posterUser}
                price={postSelected.price}
                isSelected={true} />
            <Input label={"¿Cuál sera tu contraoferta?"} placeholder={"Ofrece tu tarifa"} value={counterOffer} onChange={handleInputChange}></Input>
            <FlexContainer direction="row" gap="15px">
                <Button color={theme.colors.primaryLight} text={"Atras"} textColor={theme.colors.foreground} onClick={()=>setStep(0)} ></Button>
                <Button text={"Solicitar"} width={"100%"} onClick={()=>setStep(2)} disabled={counterOffer===""}></Button>
                
            </FlexContainer>
            
        </FlexContainer>),
        2: (<FlexContainer direction="column" gap="20px">
            <LoadingBar></LoadingBar>
            <PostDeliveryCard
                deliveryTitle={postSelected.title}
                pickUpLocation={postSelected.pickupLocation}
                deliveryLocation={postSelected.pickupLocation}
                deliveryHour={postSelected.createdAtHour}
                posterName={postSelected.posterUser}
                price={postSelected.price}
                isSelected={true}
                bottomText={counterOffer}/>
            <div>
            <Title text={"Descripción"}/>
            <Paragraph text={postSelected.description}/>
            </div>
            <Button text={"Cancelar solicitud"} className={"mt-3"}></Button>
        </FlexContainer>)
    }

    return (
        <>
            <SlidingPanel title={""}>
                {renderSteps[step]}
            </SlidingPanel>
        </>
    )
}