'use client'
import Button from "@/app/ui/essentials/Button"
import { FlexContainer } from "@/app/ui/essentials/FlexBox"
import Input from "@/app/ui/essentials/Input"
import Select from "@/app/ui/essentials/Select"
import Modal from "@/app/ui/modals/Modal"
import Header from "@/app/ui/utilities/Header"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styled from "styled-components"

const ProfilePhotoContainer = styled.div`
    position: relative;
    display: inline-block;
`

const ProfilePhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid ${({theme})=> theme.colors.primary};
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
    background-color: ${({theme})=>theme.colors.primary} ;
    top: 70px;
    right: 0;
    padding: 10px;
`

export default function Page(){

    const data = {
        user: {
            name: "Daniel Alexander Ochoa",
            email: "danyochoa112@gmail.com",
            birthday: "2003-03-08",
            photo: "/img/pruebas/odin.svg",
            careerId: 1 
        },
        careers: [
            {id: 1, name: "Ingeniería en Sistemas"},
            {id: 2, name: "Ingeniería Civil"},
            {id: 3, name: "Ingeniería Industrial"}
        ]
    }

    const router = useRouter();

    const [isOpenUpload, setIsOpenUpload] = useState(false);
    const [formData, setFormData] = useState(data.user);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    return (<>
        <Header text={"Editar Perfil"} router={router} />
        <FlexContainer className="mb-5 px-4" direction="column">
            {/*Seccion de edicion de foto de perfil*/}
            <FlexContainer justifycontent="center" className="mb-4">
                <ProfilePhotoContainer onClick={()=>{setIsOpenUpload(true)}}>
                    <ProfilePhoto src={data.user.photo} />
                    <EditIconContainer>
                        <img src="/icons/edit-profile-icon.svg" width="15" height="15" />
                    </EditIconContainer>
                </ProfilePhotoContainer>
            </FlexContainer>

            {/*Formulario*/}
            <section>
                <form>
                    <FlexContainer direction="column" gap="15px" className="mb-6">
                        <Input
                            label={"Nombre Completo"}
                            placeholder={"ingresa tu nombre"}
                            required={true}
                            value={formData.name}
                            name={"name"}
                            onChange={(e)=>handleChange(e)}/>
                        <Input
                            label={"Correo Electrónico"}
                            placeholder={"Correo electrónico"}
                            type={"email"}
                            required={true}
                            value={formData.email}
                            name={"email"}
                            onChange={(e)=>handleChange(e)}/>
                        <Input
                            label={"Fecha de nacimiento"}
                            type={"date"}
                            required={true}
                            value={formData.birthday}
                            name={"birthday"}
                            onChange={(e)=>handleChange(e)}
                            />
                        <Select
                            optionsList={data.careers}
                            label={"Carrera"}
                            required={true}
                            value={formData.careerId}
                            name={"careerId"}
                            onChange={(e)=>handleChange(e)}
                        />
                    </FlexContainer>
                    <FlexContainer className="mt-5" justifycontent="center">
                        <Button text={"Editar"} paddingx={"30%"}></Button>
                    </FlexContainer>
                </form>
            </section>
        </FlexContainer>
        <Modal
            isOpen={isOpenUpload}
            title={"Subir Foto de perfil"}
            onClose={()=>{setIsOpenUpload(false)}}>
                <form>
                <Input type={'file'} label={"Selecciona tu foto de pefil"}></Input>
                <Button text={"Subir"} className={"mt-3"}></Button>
                </form>
        </Modal>
    </>)
}