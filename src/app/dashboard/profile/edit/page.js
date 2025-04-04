'use client'
import Button from "@/app/ui/essentials/Button"
import { FlexContainer } from "@/app/ui/essentials/FlexBox"
import Input from "@/app/ui/essentials/Input"
import Select from "@/app/ui/essentials/Select"
import Modal from "@/app/ui/modals/Modal"
import Header from "@/app/ui/utilities/Header"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { getCareers, getUser, updateProfile } from "./services"
import Paragraph from "@/app/ui/essentials/Paragraph"
import { validateName, validateRequiredForm } from "./validations"
import { validateEmail } from "@/app/utils/validators"
import StatusPopUp from "@/app/ui/modals/StatusPopUp"
import { LoaderSpin } from "@/app/ui/ux/LoadingSpin"

const ProfilePhotoContainer = styled.div`
    position: relative;
    display: inline-block;
`

const ProfilePhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    padding: 2px;
`

const EditIconContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary} ;
    top: 70px;
    right: 0;
    padding: 10px;
`

export default function Page() {
    const router = useRouter();

    //Datos
    const [profilePic, setProfilePic] = useState(""); //Solo para mostrar
    const [careers, setCareers] = useState([]);
    const [formData, setFormData] = useState({});

    
    //Estados de interfaz
    const [errorMessage, setErrorMessage] = useState();
    const [isDisabled, setIsDisabled] = useState();
    const [isOpenUpload, setIsOpenUpload] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [responsePopup, setResponsePopup] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    //handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
            setFormData({ ...formData, [name]: file });
        }
      };

    useEffect(() => {

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const [userData, careersData] = await Promise.all([
                    getUser(token),
                    getCareers(token)
                ]);

                setProfilePic(userData.data.profilePic.link);
                setFormData({
                    name: userData.data.name,
                    email: userData.data.email,
                    birthDay: userData.data.birthDay,
                    IdCareer: userData.data.career.id,
                });

                setCareers(careersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Finaliza la carga
            }
        };

        fetchData();

    }, [])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMessage("");
        setIsDisabled(true);

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login') //El usuario no esta autenticado
            return;
        }

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const formError = validateRequiredForm(formData);

        if (nameError || emailError || formError) {
            setErrorMessage(nameError || emailError || formError);
            setIsDisabled(false);
            return;
        }

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
              form.append(key, value);
            });
            const { success, message } = await updateProfile(form, token);
            if (success == true) {
                setResponsePopup({
                    title: "Acción Exitosa",
                    subtitle: "Se ha realizado la acción de forma satisfactoria",
                    isSuccess: success,
                    message: message
                })
                setIsOpenPopup(true);
                setIsDisabled(false);
            } else {
                setResponsePopup({
                    title: "Acción Fallida",
                    subtitle: "NO se ha realizado la acción de forma satisfactoria",
                    isSuccess: success,
                    message: message
                })
                setIsOpenPopup(true);
                setIsDisabled(false);
            }
        } catch (error) {
            setErrorMessage(error.message || "Error al editar tu perfil. Intentalo de nuevo")
        }

    }

    const onClosePopup = (success) => {
        setIsOpenPopup(false);
        if (success==true) {
            router.push('/dashboard/profile')
        }
    }

    if (isLoading) {
        return <FlexContainer justifycontent="center" alignitems="center" height="100vh"><LoaderSpin/></FlexContainer>;
    }

    return (<>
        <Header text={"Editar Perfil"} router={router} />
        <FlexContainer className="mb-5 px-4" direction="column">
            {/*Seccion de edicion de foto de perfil*/}
            <FlexContainer justifycontent="center" className="mb-4">
                <ProfilePhotoContainer onClick={() => { setIsOpenUpload(true) }}>
                    <ProfilePhoto src={profilePic} />
                    <EditIconContainer>
                        <img src="/icons/edit-profile-icon.svg" width="15" height="15" />
                    </EditIconContainer>
                </ProfilePhotoContainer>
            </FlexContainer>

            {/*Formulario*/}
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <FlexContainer direction="column" gap="15px" className="mb-6">
                    <Input
                        label={"Nombre Completo"}
                        placeholder={"ingresa tu nombre"}
                        value={formData.name}
                        name={"name"}
                        onChange={(e) => handleChange(e)} />
                    <Input
                        label={"Correo Electrónico"}
                        placeholder={"Correo electrónico"}
                        type={"email"}
                        value={formData.email}
                        name={"email"}
                        onChange={(e) => handleChange(e)} />
                    <Input
                        label={"Fecha de nacimiento"}
                        type={"date"}
                        value={formData.birthDay}
                        name={"birthDay"}
                        onChange={(e) => handleChange(e)}
                    />
                    <Select
                        optionsList={careers}
                        label={"Carrera"}
                        value={formData.IdCareer}
                        name={"IdCareer"}
                        onChange={(e) => handleChange(e)}
                    />
                </FlexContainer>
                {errorMessage && <Paragraph color={"red"} text={errorMessage}></Paragraph>}
                <FlexContainer className="mt-5" justifycontent="center">
                    <Button type="submit" disabled={isDisabled} text={isDisabled ? "Editando..." : "Editar"} paddingx={"30%"}></Button>
                </FlexContainer>
                <Modal
                    isOpen={isOpenUpload}
                    title={"Subir Foto de perfil"}
                    onClose={() => { setIsOpenUpload(false) }}>
                    <Input type={'file'} label={"Selecciona tu foto de pefil"} onChange={(e) => handleFileChange(e)} name={"profilePic"}></Input>
                    <Button text={"Seleccionar"} className={"mt-3"} onClick={()=>{setIsOpenUpload(false)}}></Button>
                </Modal>
            </form>
        </FlexContainer>
        <StatusPopUp isOpen={isOpenPopup} onClose={()=>onClosePopup(responsePopup.isSuccess)} response={responsePopup}></StatusPopUp>
    </>)
}