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
import { createOffer, getLocations, getNearPosts } from "./services";
import Map from "@/app/ui/maps/Map";
import { Marker } from "@react-google-maps/api";
import { LoaderSpin } from "@/app/ui/ux/LoadingSpin";
import StatusPopUp from "@/app/ui/modals/StatusPopUp";
import { useRouter } from "next/navigation";
import { connectSignalR } from "./signalrService";
import Image from "next/image";

export default function Page(){
    //Utilidades
    const theme = useTheme();
    const router = useRouter();

    //Comportamiento
    const [step, setStep] = useState(0);
    const [counterOffer, setCounterOffer] = useState("");
    const handleInputChange = (event) => {
        setPrice(event.target.value);
        setCounterOffer(event.target.value);
      };
    const [locationSelected, setLocationSelected] = useState(1);
    const [postSelected, setPostSelected] = useState({});
    const [price, setPrice] = useState(null);
    const [isCounterOffer, setIsCounterOffer] = useState(false);
    const [socketConnection, setSocketConnection] = useState(null);
    const [isAccepted, setIsAccepted] = useState(false);

    //Data
    const [locations, setLocations] = useState([]);
    const [posts, setPosts] = useState([]);

    //UX
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [responsePopup, setResponsePopup] = useState({});

    const fetchPosts = async (locationId)=>{
        setIsLoading(true);
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        try {
            const postResponse = await getNearPosts(token, locationId);
            setPosts(postResponse);
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
            setLocationSelected(idLocation);
            fetchPosts(idLocation);
            
        }
    }

    const handleSubmit =  async () => {
        setErrorMessage("");
        
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login') //El usuario no esta autenticado
            return;
        }

        const dataToSend = {
            CounterOfferAmount: price,
            PostId: postSelected.id,
            IsCounterOffer: isCounterOffer,
        };

        //Peticion al Backend
        try {

        const {data, success, message}  = await createOffer(dataToSend, token);

        const offer = data; //Se guarda la offer retornada

        if (success==true) {

            setResponsePopup({
                title: "Acción Exitosa",
                subtitle: "Se ha realizado la acción de forma satisfactoria",
                isSuccess: success,
                message: message
            })
            setIsOpenPopup(true);
            setStep(2); //Se pasa al paso de espera

            const connection = await connectSignalR(); //Se crea una conexion con el webSocket

            if (!connection) { //Se verifica la conexion
                throw new Error("Ocurrio un error al comunicarse con el websocket");
            }

            setSocketConnection(connection); //Se guarda la conexion
            
            await connection.invoke("JoinPostGroup", postSelected.id.toString()); //Se une al grupo con el id de post

            connection.on("GetOfferState", (response)=>{  //Cuando responde el backend (Se acepto una offer)
                setIsAccepted(parseInt(response.offerId) == offer.id); //Se verifica si coincide con la oferta del usuario
                setStep(3);
            })

        }else{
            setResponsePopup({
                title: "Acción Fallida",
                subtitle: "NO se ha realizado la acción de forma satisfactoria",
                isSuccess: success,
                message: message
            })
            setIsOpenPopup(true);
        }
        } catch (error) {
            setErrorMessage(error.message || "Error al crear un post. Intentalo de nuevo")
        }
    };

    const handleSelectPost = (post) => {
        setPostSelected(post);
        setPrice(post.suggestedValue);
    };

    const sendForm = async () => {
        setPrice(postSelected.suggestedValue);
        console.log(price);
        await handleSubmit();
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
                    onClick={() => { handleSelectPost(post) }}
                    isSelected={post.id === postSelected?.id}
                    action={() => setStep(1)} />)}
            {Object.keys(postSelected).length > 0 && <Button text={"Solicitar"} className={"mt-4"} onClick={() => sendForm()}/>}
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
            <Input label={"¿Cuál sera tu contraoferta?"} placeholder={"Ofrece tu tarifa"} value={price} onChange={handleInputChange}></Input>
            <FlexContainer direction="row" gap="15px">
                <Button color={theme.colors.primaryLight} text={"Atras"} textColor={theme.colors.foreground} onClick={()=>setStep(0)} ></Button>
                <Button text={"Solicitar"} width={"100%"} onClick={()=>handleSubmit()} disabled={counterOffer===""}></Button>
                
            </FlexContainer>
            
        </FlexContainer>),
        2: (<FlexContainer direction="column" gap="20px">
            <LoadingBar></LoadingBar>
            <Title text={`Espera que ${postSelected.posterUserName?.split(" ")[0] || 'el usuario'} acepte tu oferta`} color={theme.colors.foreground} />
            <PostDeliveryCard
                deliveryTitle={postSelected.title}
                pickUpLocation={postSelected.pickUpLocation}
                deliveryLocation={postSelected.deliveryLocation}
                deliveryHour={postSelected.createdAt}
                posterName={postSelected.posterUserName}
                price={postSelected.suggestedValue}
                isSelected={true}
                bottomText={counterOffer}/>
            <div>
            <Title text={"Descripción"}/>
            <Paragraph text={postSelected.description}/>
            </div>
            <Button text={"Cancelar solicitud"} className={"mt-3"} onClick={() => {cancelRequest()}}></Button>
        </FlexContainer>),
        3: (<FlexContainer direction="column" gap="20px">
            <FlexContainer direction="column" alignitems="center">
            <Image src={isAccepted ? "/icons/user-running.svg" : "/icons/user-sad.svg"} width={50} height={50} alt="user-running"></Image>
            <Paragraph align={"center"} className={"mt-2"} size={"20px"} weight={600} text={isAccepted ? "Tu solicitud ha sido aceptada. ¡puedes iniciar el recorrido!" :"Lo sentimos, el Poster no ha aceptado tu solicitud"}></Paragraph>
            </FlexContainer>
            <PostDeliveryCard
                deliveryTitle={postSelected.title}
                pickUpLocation={postSelected.pickUpLocation}
                deliveryLocation={postSelected.deliveryLocation}
                deliveryHour={postSelected.createdAt}
                posterName={postSelected.posterUserName}
                price={postSelected.suggestedValue}
                isSelected={true}
                bottomText={counterOffer}/>
            <div>
            <Title text={"Descripción"}/>
            <Paragraph text={postSelected.description}/>
            </div>
            <Button text={isAccepted ? "Empezar Mandadito" : "Volver a buscar"} className={"mt-3"}></Button>
        </FlexContainer>)
    }

    const onCloseModal = (success) => {
        setIsOpenPopup(false);
        if (success==false) {
            router.push('/dashboard/home')
        }

    }

    const cancelRequest = () => {
        router.push('/dashboard/home')
    }

    return (
        <>
            <Map>
                {locations.map(({id,name, latitude, longitude},index) => <Marker key={index} position={{lat: latitude, lng: longitude}} label={name} onClick={()=>{updatePosts(id)}}></Marker>)}
            </Map>
            <SlidingPanel title={""}>
                {isLoading ? <FlexContainer justifycontent="center" alignitems="center" ><LoaderSpin/></FlexContainer> : renderSteps[step]}
            </SlidingPanel>
            <StatusPopUp isOpen={isOpenPopup} onClose={()=>onCloseModal(responsePopup.isSuccess)} response={responsePopup}></StatusPopUp>
        </>
    )
}