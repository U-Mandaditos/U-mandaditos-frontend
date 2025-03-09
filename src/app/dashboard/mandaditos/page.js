'use client'

import Title from "@/app/ui/essentials/Title";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Input from "@/app/ui/essentials/Input";
import LocationSelect from "@/app/ui/utilities/LocationSelect";
import styled, { useTheme } from "styled-components";
import Button from "@/app/ui/essentials/Button";
import Textarea from "@/app/ui/utilities/Textarea";
import { Fleur_De_Leah } from "next/font/google";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import { useState } from "react";

const PageContainer = styled.div`
    min-height: 100vh;
    padding: 2.5rem 1.5rem;
`;

export default function MandaditoNuevo(){
    const theme = useTheme();

    const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [comision, setComision] = useState();
    const [miUbicacion, setMiUbicacion] = useState();
    const [dondeUbicacion, setDondeUbicacion] = useState();

    const handleChangeTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const handleChangeComision = (e) => {
        setComision(e.target.value);
    }

    const handleChangeMiUbicacion = (e) => {
        setMiUbicacion(e.target.value);
        console.log('ejecutando')
    }

    const handleChangeDondeUbicacion = (e) => {
        setDondeUbicacion(e.target.value);
    }

    const handlePostearClick = () => {
        console.log("posteando");
    }

    const locations = [
        {
            name: "CC",
            key: 1
        },
        {
            name: "Hollywood",
            key: 2
        },
        {
            name: "B2",
            key: 3
        }
    ]

    return (
        <PageContainer>

            <Title text={"Postea un mandadito"} size={'2rem'} wwigt={'500'}/>

            <Paragraph text={"Completa los datos de tu mandadito"} color={theme.colors.secondaryText} className={'mb-5'}/>

            <FlexContainer direction={'column'} gap={'22px'} alignitems={'center'}>
                <LocationSelect text={"¿Donde estas?"} optionList={locations} onChange={handleChangeMiUbicacion} />
                <LocationSelect text={"¿Donde es tu mandadito?"} optionList={locations} onChange={handleChangeDondeUbicacion}/>

                <Input label={"Título"} placeholder={"e.g. papas fritas del CC"} value={titulo} onChange={handleChangeTitulo}/>


                <Textarea label={"Descripción"} placeholder={"e.g. Necesito que alguien me compre unas papas frita del CC y me las traiga lo antes posible"} value={descripcion} onChange={handleChangeDescripcion} height={'90px'}/>

                <Input label={"Comisión ofrecida"} placeholder={"e.g. 30"} value={comision} onChange={handleChangeComision} type={'number'}/>

                <Button text={"Postear"} onClick={handlePostearClick} width={'90%'} paddingy={'15px'} className={'mt-5'}/>

            </FlexContainer>
        </PageContainer>      
    )
}