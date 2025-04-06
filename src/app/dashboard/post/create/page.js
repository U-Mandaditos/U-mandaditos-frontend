'use client'
import Title from "@/app/ui/essentials/Title";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Input from "@/app/ui/essentials/Input";
import LocationSelect from "@/app/ui/utilities/LocationSelect";
import styled, { useTheme } from "styled-components";
import Button from "@/app/ui/essentials/Button";
import Textarea from "@/app/ui/utilities/Textarea";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import { useEffect, useState } from "react";
import { createPost, getLocations } from "./services";
import StatusPopUp from "@/app/ui/modals/StatusPopUp";
import { validateDescription, validateLocations, validateRequiredForm, validateTitle } from "./validations";
import { useRouter } from "next/navigation";

const PageContainer = styled.div`
    min-height: 100vh;
    padding: 2.5rem 1.5rem;
`;

export default function MandaditoNuevo() {
    const theme = useTheme();
    const router = useRouter();

    //Validaciones y data
    const [locations, setLocations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        SuggestedValue: '',
        IdPickupLocation: '',
        IdDeliveryLocation: ''
    });

    //Modales
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [responsePopup, setResponsePopup] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(()=>{
        const fetchLocations = async ()=>{
            const token = localStorage.getItem('token')
            if (!token) {
              router.push('/login')
              return
            }

            try {
                const {data} = await getLocations(token);
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        }

        fetchLocations();
    },[])

    const handleSubmit =  async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsDisabled(true);

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login') //El usuario no esta autenticado
            return;
        }

        //Validaciones
        const emptyError = validateRequiredForm(formData);
        const titleError = validateTitle(formData.Title);
        const descriptionError = validateDescription(formData.Description);
        const locationError = validateLocations(formData.IdPickupLocation, formData.IdDeliveryLocation);

        if (emptyError || titleError || descriptionError || locationError) {
            setErrorMessage(emptyError || titleError || descriptionError || locationError);
            setIsDisabled(false);
            return;
        }

        //Peticion al Backend
        try {
        const {success, message}  = await createPost(formData, token);
        if (success==true) {
            setResponsePopup({
                title: "Acción Exitosa",
                subtitle: "Se ha realizado la acción de forma satisfactoria",
                isSuccess: success,
                message: message
            })
            setIsOpenPopup(true);
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

    const onCloseModal = (success) => {
        setIsOpenPopup(false);
        if (success==false) {
            router.push('/dashboard/home')
        }

    }

    return (
        <PageContainer>

            <Title text={"Postea un mandadito"} size={'2rem'} weight={'500'} />

            <Paragraph text={"Completa los datos de tu mandadito"} color={theme.colors.secondaryText} className={'mb-5'} />
            <form onSubmit={(e)=>handleSubmit(e)}>
            <FlexContainer direction={'column'} gap={'22px'} alignitems={'center'} className="mt-5">
                <LocationSelect text={"¿Donde estas?"} optionList={locations} onChange={handleChange} name={'IdPickupLocation'} />
                <LocationSelect text={"¿Donde es tu mandadito?"} optionList={locations} onChange={handleChange} name={'IdDeliveryLocation'} />

                <Input label={"Título"} placeholder={"e.g. papas fritas del CC"} value={formData.Title} onChange={handleChange} name={'Title'} />


                <Textarea label={"Descripción"} placeholder={"e.g. Necesito que alguien me compre unas papas frita del CC y me las traiga lo antes posible"} value={formData.Description} onChange={handleChange} height={'90px'} name={'Description'} />

                <Input label={"Comisión ofrecida"} placeholder={"e.g. 30"} value={formData.SuggestedValue} onChange={handleChange} type={'number'} name={'SuggestedValue'} />

                {errorMessage && <Paragraph text={errorMessage} color={'red'} />}
                <Button disabled={isDisabled} text={ isDisabled ? "Posteando..." : "Postear"} width={'90%'} paddingy={'15px'} className={'mt-5'} type="submit"/>
            </FlexContainer>
            </form>
            <StatusPopUp isOpen={isOpenPopup} onClose={()=>onCloseModal(responsePopup.isSuccess)} response={responsePopup}></StatusPopUp>
        </PageContainer>
    )
}