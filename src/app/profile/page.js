'use client'
import { useRouter } from "next/navigation";
import IconTextCard from "../ui/cards/IconTextCard";
import UserCard from "../ui/cards/UserCard";
import Button from "../ui/essentials/Button";
import { FlexContainer } from "../ui/essentials/FlexBox";
import Paragraph from "../ui/essentials/Paragraph";
import Header from "../ui/utilities/Header";
import { useTheme } from "styled-components";
import DeliveryIcon from "/public/icons/delivery-icon.svg"
import PostIcon from "/public/icons/post-icon.svg"
import Title from "../ui/essentials/Title";
import ReviewCard from "../ui/cards/ReviewCard";

export default function Page() {

    const router = useRouter();
    const theme = useTheme();

    const data = {
        user: {
            name: "Daniel Ochoa",
            image: "/img/pruebas/odin.svg",
            stars: 4,
            carreer: "Ingeniería en Sistemas",
            age: 22
        },
        stats:{
            deliveries: 12,
            post: 4
        },
        reviews: [
            {
                user: {
                    name: "Daniel Ochoa",
                    image: "/img/pruebas/odin.svg",
                    stars: 4,
                },
                coment: "Nunca llegó a entregar el producto.",
                comentDate: "08-03-2025",
                isPosted: true
            },
            {
                user: {
                    name: "Juan Lainez",
                    image: "/img/pruebas/odin.svg",
                    stars: 3,
                },
                coment: "Nunca fue a recoger el producto.",
                comentDate: "08-03-2025",
                isPosted: false
            }
        ]
    }

    return (
        <>
            <Header text={"Tu perfil"} router={router}></Header>

            <div className="px-4">
                <UserCard user={data.user}></UserCard>

                <Paragraph text={"Ingeniería en Sistemas"} weight={600} className={"mt-3"} color={theme.colors.secondaryText}></Paragraph>
                <Paragraph text={`${data.user.age} Años`} weight={600} className={"mt-1"} color={theme.colors.secondaryText}></Paragraph>
                
                <FlexContainer className="mt-4" justifycontent="center">
                    <IconTextCard icon={DeliveryIcon} text={`${data.stats.deliveries} Entregas`} className={"mr-5"}></IconTextCard>
                    <IconTextCard icon={PostIcon} text={`${data.stats.post} Pedidos`} color={theme.colors.primaryLight}></IconTextCard>
                </FlexContainer>
                
                <Title text={"Reseñas"} className={"mb-3 mt-5"}></Title>
                
                <FlexContainer direction="column" gap="20px">
                    {data.reviews.map(review => <ReviewCard postUser={review.user} isPosted={review.isPosted} coment={review.coment} comentDate={review.comentDate}></ReviewCard>)}
                </FlexContainer>

            </div>
        </>
    )
}