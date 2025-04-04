'use client'
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Title from "@/app/ui/essentials/Title";
import Header from "@/app/ui/utilities/Header";
import LocationSelect from "@/app/ui/utilities/LocationSelect";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Image from "/public/img/image-home.svg"
import DeliveryCard from "@/app/ui/cards/DeliveryCard";
import { getLocations, getPosts, getUser } from "./services";
import { useRouter } from "next/navigation";

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

const dataa = {
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
            key: 1,
            pickUpLocation: "B2",
            deliveryLocation: "Polideportivo",
            deliveryHour: "3:00 pm",
            deliveryTitle: "Alitas del CC",
            runnerName: "Angel Fernando Castillo",
            status: 1,
            price: "L 20.00"
        },
        {
            key: 2,
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
    const [user, setUser] = useState({ name: "" });
    const [locations, setLocations] = useState([]);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const [selectedLocation, setSelectedLocation] = useState(null);

    const navigate = (id) => {
        router.push(`/dashboard/delivery-detail/${id}`)
    }

    const changeLocation = (idLocation) => {
        setSelectedLocation(idLocation);
        localStorage.setItem("idLocation", idLocation);
    }
     
    const createMandadito = () => {
        router.push("/dashboard/post/create")
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await getUser(token);
                const location = await getLocations(token);
                const post = await getPosts(token);
                if (response) {
                    const fullName = response.data.name || "";
                    const firstName = fullName.split(" ")[0];
                    
                    setUser({
                        ...response.userObject,
                        name: firstName || "Usuario",
                        profilePic: response.data.profilePic.link,
                    });
                    setLocations(location.data);
                    setPosts(post);

                    
                    console.log(response);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Opcional: redirigir a login si hay error
                router.push('/login');
            }
        }

        fetchUserData();
    }, [router]);

    return (
        <>
            <FlexContainer className="p-5" direction="column" gap="30px">
                <FlexContainer direction="row">
                    <FlexContainer direction="column">
                        <Title text={`Hola ${user.name || "..."}`} />
                        <Paragraph text="Bienvenido a U-mandaditos" color={theme.colors.secondaryText}/>
                    </FlexContainer>
                    <UserImage src={user.profilePic || dataa.userImage} alt="Foto de perfil" />
                </FlexContainer>

                <LocationSelect text="¿Donde estás?" optionList={locations} onChange={(e) => changeLocation(e.target.value)}/>

                <Card>
                    <FlexContainer direction="column" width="70%" gap="1px">
                        <Paragraph text="¿Quieres postear" size="12px"/>
                        <Title text="Un mandadito?" size="20px" weight="500"/>
                        <Paragraph text="Siéntate y encuentra el mejor runner." size="10px" color={theme.colors.secondaryText}/>
                        <Button 
                            text="Crea un mandadito" 
                            width="75%" 
                            fontSize="10px" 
                            paddingx="3px" 
                            paddingy="8px" 
                            className="mt-2"
                            onClick={() => {createMandadito()}}
                        />
                    </FlexContainer>
                    <Icon as={Image} />
                </Card>

                <FlexContainer direction="column" gap="5px">
                    <Title text="Tus mandaditos posteados" weight="450" size="20px" className="mb-2"/>
                    {posts.map((delivery) =>
                        <DeliveryCard 
                            key={delivery.id}
                            pickUpLocation={delivery.pickUpLocation} 
                            deliveryLocation={delivery.deliveryLocation}
                            deliveryHour={delivery.createdAt} 
                            deliveryTitle={delivery.title}
                            runnerName={delivery.runnerName}
                            status={delivery.status}
                            price={delivery.suggestedValue} 
                            ActionButton={() => {navigate(delivery.id)}}

                        />
                    )} 
                </FlexContainer>
                
                <FlexContainer direction="column" gap="5px">
                    <Title text="Encuentra mandaditos cerca de ti" weight="450" size="20px" className="mb-2"/>
                    <img src="/img/img-map.png" alt="Mapa de mandaditos" />
                </FlexContainer>
            </FlexContainer>
        </>
    );
}