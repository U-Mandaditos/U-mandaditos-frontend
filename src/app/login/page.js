'use client'

import Button from "../ui/essentials/Button"
import { FlexContainer} from "../ui/essentials/FlexBox"
import Input from "../ui/essentials/Input"
import Paragraph from "../ui/essentials/Paragraph"
import Title from "../ui/essentials/Title"
import Link from "../ui/essentials/Link"
import AuthenticationHeader from "../ui/utilities/AuthenticationHeader"

export default function Page(){
    return (
        <FlexContainer className="p-5" direction="column" justifycontent="center" alignitems="start" gap="3rem">
            <AuthenticationHeader title={"Iniciar sesión"} text={"Bienvenido de vuelta a U-Mandaditos"} />
            <div> 
                <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Correo" />
                <Input name={"email"} required={false} type={"email"} width={"314px"} placeholder="e.g afcastillof@unah.hn" />
            </div>
            <div>
                <Title className={"mb-2"} weight={"strong"} size={"medium"} text="Contraseña" />
                <Input name={"password"} type={"password"} required={false} width={"314px"} placeholder="Ingresa tu contraseña" />
                <Link text={"¿Olvidaste tu contraseña?"} color={(props) => props.theme.colors.secondaryText} size={"13px"} weight={"400"} float={"right"} href={"#"}/>
            </div>   
            <FlexContainer direction="column" alignitems="center">
                <Button borderRadius={"30px"} width={"300px"} text={"Iniciar sesión"}/>
            </FlexContainer>   
            <FlexContainer direction="row" alignitems={"center"} justifycontent="center" gap="5px">
                <Paragraph color={(props) => props.theme.colors.secondaryText} weight={"600"} size={"13px"} text={"¿Todavía no tienes una cuenta?"}/> 
                <Link href="/register" text={"Regístrate"} color={(props) => props.theme.colors.primary} size={"13px"} weight={"600"} float={"none"}/>
            </FlexContainer>      
        </FlexContainer>
    )
}