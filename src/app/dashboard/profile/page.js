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

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${(props) => props.theme.colors.lineColor};
  margin: 20px 20px 20px 20px;
`;

export default function Page(){

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

    const router = useRouter();
    const theme = useTheme();

    return (<>
        <Header text={"Tu perfil"} router={router}></Header>
        <div className="px-5">
            <UserCard user={data.user}></UserCard>
            <Paragraph text={"Ingeniería en Sistemas"} weight={600} className={"mt-3"} color={theme.colors.secondaryText}></Paragraph>
            <Paragraph text={`${data.user.age} Años`} weight={600} className={"mt-1"} color={theme.colors.secondaryText}></Paragraph>
            <FlexContainer className="mt-4">
                <IconTextCard icon={DeliveryIcon} text={`${data.stats.deliveries} Entregas`} className={"mr-5"}></IconTextCard>
                <IconTextCard icon={PostIcon} text={`${data.stats.post} Pedidos`} color={theme.colors.primaryLight}></IconTextCard>
            </FlexContainer>
            <FlexContainer className="mt-4 px-4" justifycontent="center">
                <Button text={"Editar Perfil"} borderRadius={"30px"} paddingx={"60px"} paddingy={"8px"} className={"mr-6"}></Button>
            </FlexContainer>
        </div>
        <Divider/>
        <FlexContainer direction="column" className="px-4">
            {buttonLinks.map(button=><AccessButton text={button.text} icon={button.icon} Action={()=>{router.push(button.href)}}></AccessButton>)}
        </FlexContainer>
    </>)
}