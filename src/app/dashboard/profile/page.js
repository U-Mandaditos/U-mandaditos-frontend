'use client'
import IconTextCard from "@/app/ui/cards/IconTextCard";
import UserCard from "@/app/ui/cards/UserCard";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Header from "@/app/ui/utilities/Header";
import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";
import DeliveryIcon from "/public/icons/delivery-icon.svg"
import PostIcon from "/public/icons/post-icon.svg"
import Button from "@/app/ui/essentials/Button";
import { buttonLinks } from "./data-render";
import AccessButton from "@/app/ui/navigation/AccessButton";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/ui/essentials/Loader";
import { API_URL } from "@/app/utils/settings";

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${(props) => props.theme.colors.lineColor};
  margin: 20px 20px 20px 20px;
`;

export default function Page(){

    const [error, setError] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const theme = useTheme();

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

                const response = await fetch(`${API_URL}/api/user/privateProfile`, { 
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
                
            console.log(data);
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
                    }
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
    const { user, stats } = dataUser;
    console.log(user);

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
        }
    }

    return (<>
        <Header text={"Tu perfil"} router={router}></Header>

        <div className="px-5 mb-5">
            {/**Nombre, estrellas e informacion del usuario */}
            <UserCard user={user}></UserCard>
            <Paragraph text={user.carreer.name} weight={600} className={"mt-3"} color={theme.colors.secondaryText}></Paragraph>
            <Paragraph text={`${data.user.age} Años`} weight={600} className={"mt-1"} color={theme.colors.secondaryText}></Paragraph>
            
            {/**Estadisticas de cantidad de entregas y pedidos hechos por el usuario */}
            <FlexContainer className="mt-4" justifycontent="center">
                <IconTextCard icon={DeliveryIcon} text={`${stats.deliveries} Entregas`} className={"mr-5"}></IconTextCard>
                <IconTextCard icon={PostIcon} text={`${stats.post} Pedidos`} color={theme.colors.primaryLight}></IconTextCard>
            </FlexContainer>

            {/**Estadisticas botón de editar perfil */}
            <FlexContainer className="mt-4" justifycontent="center">
                <Button text={"Editar Perfil"} borderRadius={"30px"} paddingx={"60px"} paddingy={"8px"} onClick={()=>{router.push('/dashboard/profile/edit')}}></Button>
            </FlexContainer>
        </div>

        <Divider/>

        <FlexContainer direction="column" className="px-4">
            {buttonLinks.map((button,index)=><AccessButton key={index} text={button.text} icon={button.icon} Action={()=>{router.push(button.href)}}></AccessButton>)}
        </FlexContainer>
    </>)
}