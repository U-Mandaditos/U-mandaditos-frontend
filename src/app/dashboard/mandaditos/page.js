'use client'

import Title from "@/app/ui/essentials/Title";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Input from "@/app/ui/essentials/Input";
import LocationSelect from "@/app/ui/utilities/LocationSelect";
import styled, { useTheme } from "styled-components";
import Button from "@/app/ui/essentials/Button";
import Textarea from "@/app/ui/utilities/Textarea";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import { useState } from "react";

const PageContainer = styled.div`
    min-height: 100vh;
    padding: 2.5rem 1.5rem;
`;

export default function MandaditoNuevo() {
    const theme = useTheme();

    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        commission: '',
        fromLocation: '',
        toLocation: ''
    });

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handlePostClick = () => {
        const isEmpty = Object.values(formData).some(value => value.trim() === '');

        if (isEmpty) {
            setErrorMessage("Favor llena todos los campos.");
            return;
        }

        setErrorMessage("");
        console.log("Posting:", formData);
    };


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

            <Title text={"Postea un mandadito"} size={'2rem'} weight={'500'} />

            <Paragraph text={"Completa los datos de tu mandadito"} color={theme.colors.secondaryText} className={'mb-5'} />

            <FlexContainer direction={'column'} gap={'22px'} alignitems={'center'} className="mt-5">
                <LocationSelect text={"¿Donde estas?"} optionList={locations} onChange={handleChange} name={'fromLocation'} />
                <LocationSelect text={"¿Donde es tu mandadito?"} optionList={locations} onChange={handleChange} name={'toLocation'} />

                <Input label={"Título"} placeholder={"e.g. papas fritas del CC"} value={formData.title} onChange={handleChange} name={'title'} />


                <Textarea label={"Descripción"} placeholder={"e.g. Necesito que alguien me compre unas papas frita del CC y me las traiga lo antes posible"} value={formData.description} onChange={handleChange} height={'90px'} name={'description'} />

                <Input label={"Comisión ofrecida"} placeholder={"e.g. 30"} value={formData.commission} onChange={handleChange} type={'number'} name={'commission'} />

                {errorMessage && <Paragraph text={errorMessage} color={'red'} />}
                <Button text={"Postear"} onClick={handlePostClick} width={'90%'} paddingy={'15px'} className={'mt-5'} />

            </FlexContainer>
        </PageContainer>
    )
}