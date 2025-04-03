"use client";
import { useParams, useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";
import ReviewCard from "@/app/ui/cards/ReviewCard";
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Header from "@/app/ui/utilities/Header";
import Title from "@/app/ui/essentials/Title";
import Location from "/public/img/location-icon.svg";
import Runner from "/public/img/runner-icon.svg";
import { useEffect, useState } from "react";
import { getMandadito } from "../services";
import { LoaderSpin } from "@/app/ui/ux/LoadingSpin";
import StatusPopUp from "@/app/ui/modals/StatusPopUp";

const PageContainer = styled.div`
    padding: 20px;
    padding-top: 0;
`;

const Icon = styled.svg`
    width: ${(props) => props.width || "14px"};
    height: auto;
    path {
        fill: ${(props) => props.color || props.theme.colors.foreground};
    }
`;

const titleSize = "24px";
const titleWeight = "500";

export default function Mandadito() {

    //Hooks
    const theme = useTheme();
    const router = useRouter();
    const {id} = useParams();

    //Data
    const [mandadito, setMandadito] = useState({});
    const [rating, setRating] = useState({});

    //UX
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [responsePopup, setResponsePopup] = useState({})

    useEffect(()=>{
        const fetchMandadito = async ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login')
                return;
            }

            try {
                const result = await getMandadito(token,id);

                if (!result.success) {
                    setResponsePopup({
                        title: "Acción Fallida",
                        subtitle: "NO se pudo obtener la orden correctamente",
                        isSuccess: result.success,
                        message: result.message
                    })
                    setIsOpenPopup(true);
                }else{
                    setMandadito(result.data);
                    setRating(result.data.ratings.find(r=> r.isRunner==true))
                    setTimeout(()=>{setIsLoading(false)}, 300)
                }
            } catch (error) {
                console.error("Ocurrio un error: ", error.message);
            }
        }

        fetchMandadito();
    },[])

    const onCloseModal = (success) => {
        setIsOpenPopup(false);
        if (success==false) {
            router.push('/dashboard/order/history')
        }
    }

    if (isLoading) {
        return <FlexContainer justifycontent="center" alignitems="center" height="100vh">
            <LoaderSpin/>
            <StatusPopUp isOpen={isOpenPopup} onClose={()=>onCloseModal(responsePopup.isSuccess)} response={responsePopup}>
                <Button text={"Volver al historial"} onClick={()=>onCloseModal(responsePopup.isSuccess)}></Button>
            </StatusPopUp>
        </FlexContainer>;
    }

    return (
        <>
            <Header text="Tu entrega" router={router} />
            <PageContainer>
                <FlexContainer direction="column" gap="2rem">
                    
                    {/* Detalles de ubicación */}
                    <Section title="Detalles">
                        <FlexContainer direction="column" gap="12px" className="ml-3">
                            <Detail icon={Location} text={mandadito.post.pickupLocation} color={theme.colors.secondaryText} />
                            <Detail icon={Runner} text={mandadito.post.deliveryLocation} color={theme.colors.secondaryText} />
                        </FlexContainer>
                    </Section>

                    {/* Descripción del mandadito */}
                    <Section title="Descripción">
                        <Paragraph text={mandadito.post.description} weight={400} color={theme.colors.secondaryText} className="ml-3" />
                    </Section>

                    {/* Tarifas */}
                    <Section title="Tarifa indicada">
                        {mandadito.offer.isCounterOffer && <Paragraph text={'L. ' + mandadito.acceptedRate} size="20px" weight={400} color={theme.colors.primary} className="ml-3" />}
                        <Paragraph text={mandadito.post.suggestedValue} weight={400} color={theme.colors.secondaryText} className="ml-3" />
                    </Section>

                    {/* Información del usuario que publicó */}
                    <Section title="Publicado por">
                        <ReviewCard postUser={mandadito.post.posterUser} rating={mandadito.post.posterUser.rating} comentDate={mandadito.post.createdAt} />
                    </Section>

                    {/* Comentario sobre la calificación */}
                    <Section title="Calificación" className={"mb-3"}>
                     {rating ? <ReviewCard postUser={mandadito.offer.userCreator} rating={rating.rating} coment={rating.review} comentDate={rating.datePosted} /> : "No hay ninguna Calificación"}
                    </Section> 

                </FlexContainer>
            </PageContainer>
        </>
    );
}

function Section({ title, children, className}) {
    return (
        <div className={className}>
            <Title text={title} size={titleSize} weight={titleWeight} className="mb-2" />
            {children}
        </div>
    );
}

function Detail({ icon, text, color }) {
    return (
        <FlexContainer gap="20px">
            <Icon as={icon} />
            <Paragraph text={text} weight={400} color={color} />
        </FlexContainer>
    );
}
