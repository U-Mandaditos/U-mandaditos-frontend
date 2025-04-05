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
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { getLocations, getNearPosts } from "./services";
import Map from "@/app/ui/maps/Map";
import { Marker } from "@react-google-maps/api";
import { LoaderSpin } from "@/app/ui/ux/LoadingSpin";

export default function Page(){
    const theme = useTheme();

    //Comportamiento
    const [step, setStep] = useState(0);
    const [counterOffer, setCounterOffer] = useState("");
    const handleInputChange = (event) => {
        setCounterOffer(event.target.value);
      };
    const [locationSelected, setLocationSelected] = useState(1);
    const [postSelected, setPostSelected] = useState({});

    //Data
    const [locations, setLocations] = useState([]);
    const [posts, setPosts] = useState([]);

    //UX
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async (locationId)=>{
        setIsLoading(true);
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        try {
            const postResponse = await getNearPosts(token, locationId);
            setPosts(postResponse.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        const fetchLocations = async ()=>{
            const token = localStorage.getItem('token')
            if (!token) {
              router.push('/login')
              return
            }
    
            try {
                const postResponse = await getLocations(token);
                setLocations(postResponse.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchLocations();
        fetchPosts(1); //para efectos de prueba puse 1
    }, [])

    const updatePosts = (idLocation)=>{
        if (idLocation !== locationSelected) {
            fetchPosts(idLocation);
            setLocationSelected(idLocation)
        }
    }

    const renderSteps = {
        0: (<FlexContainer direction="column" gap="20px">
            {posts.map(post =>
                <ActionDeliveryCard
                    key={post.id}
                    deliveryTitle={post.title}
                    pickUpLocation={post.pickUpLocation}
                    deliveryLocation={post.deliveryLocation}
                    deliveryHour={post.createdAt}
                    posterName={post.posterUserName}
                    price={post.suggestedValue}
                    onClick={() => { setPostSelected(post) }}
                    isSelected={post.id === postSelected?.id}
                    action={() => setStep(1)} />)}
        </FlexContainer>),
        1: (<FlexContainer direction="column" gap="20px">
            <PostDeliveryCard
                deliveryTitle={postSelected.title}
                pickUpLocation={postSelected.pickUpLocation}
                deliveryLocation={postSelected.deliveryLocation}
                deliveryHour={postSelected.createdAt}
                posterName={postSelected.posterUserName}
                price={postSelected.suggestedValue}
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
            <Map>
                {locations.map(({id,name, latitude, longitude},index) => <Marker key={index} position={{lat: latitude, lng: longitude}} label={name} onClick={()=>{updatePosts(id)}}></Marker>)}
            </Map>
            <SlidingPanel title={""}>
                {isLoading ? <FlexContainer justifycontent="center" alignitems="center" ><LoaderSpin/></FlexContainer> : renderSteps[step]}
            </SlidingPanel>
        </>
    )
}