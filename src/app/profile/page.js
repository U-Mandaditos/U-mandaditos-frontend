'use client'
import { useRouter } from "next/navigation";
import IconTextCard from "../ui/cards/IconTextCard";
import UserCard from "../ui/cards/UserCard";
import { FlexContainer } from "../ui/essentials/FlexBox";
import Paragraph from "../ui/essentials/Paragraph";
import Header from "../ui/utilities/Header";
import { useTheme } from "styled-components";
import DeliveryIcon from "/public/icons/delivery-icon.svg"
import PostIcon from "/public/icons/post-icon.svg"
import Title from "../ui/essentials/Title";
import ReviewCard from "../ui/cards/ReviewCard";
import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/essentials/Loader";
import { API_URL } from "../utils/settings";

export default function Page() {
    const router = useRouter();
    const theme = useTheme();

    const [error, setError] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setError("No se ha encontrado el token de autenticación.");
                    setIsLoading(false);
                    router.push("/login"); // Redirige al usuario a la página de inicio de sesión
                    return;
                }

                const response = await fetch(`${API_URL}/api/user/publicProfile/${1020}`, { // Aqui va el id del usuario...
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los datos del usuario.");
                }

                const data = await response.json();
                
                const userData = data.data;

                setDataUser({
                    user: {
                        name: userData.user.name,
                        image: userData.user.profilePic.link, 
                        stars: userData.user.score,  
                        carreer: userData.user.career.name,  
                        age: userData.user.edad 
                    },
                    stats: {
                        deliveries: userData.stats.deliveries,
                        post: userData.stats.posts
                    },
                    reviews: userData.reviews.map(review => ({
                        id: review.id,
                        user: {
                            name: review.user.name,
                            image: review.user.image,
                            stars: review.user.stars
                        },
                        coment: review.comment,
                        comentDate: review.commentDate,
                        isPosted: review.isPosted
                    }))
                });

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error al cargar los datos del usuario.");
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []); 

    if (isLoading) {
        return <LoadingSpinner />; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    // Accediendo a los datos del usuario
    const { user, stats, reviews } = dataUser;

    return (
        <>
            <Header text={"Perfil"} router={router} />

            <div className="px-4">
                {/* Card del usuario */}
                <UserCard user={user} />

                <Paragraph
                    text={user.carreer || "Carrera no disponible"}
                    weight={600}
                    className={"mt-3"}
                    color={theme.colors.secondaryText}
                />

                <Paragraph
                    text= { user.age == 1 ? `${user.age } Año` : `${user.age } Años`}
                    weight={600}
                    className={"mt-1"}
                    color={theme.colors.secondaryText}
                />

                <FlexContainer className="mt-4" justifycontent="center">
                    <IconTextCard
                        icon={DeliveryIcon}
                        text={`${stats.deliveries} Entregas`}
                        className={"mr-5"}
                    />
                    <IconTextCard
                        icon={PostIcon}
                        text={`${stats.post} Pedidos`}
                        color={theme.colors.primaryLight}
                    />
                </FlexContainer>

                <Title text={"Reseñas"} className={"mb-3 mt-5"} />

                <FlexContainer direction="column" gap="20px">
                    {reviews && reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            ratedUser={user.name.split(" ")[0]}
                            postUser={review.user}
                            isPosted={review.isPosted}
                            coment={review.coment}
                            comentDate={review.comentDate}
                            rating={ review.user.stars }
                        />
                    ))}
                </FlexContainer>
            </div>
        </>
    );
}