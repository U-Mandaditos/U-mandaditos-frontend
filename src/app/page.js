'use client'
import { useState } from "react";
import Input from "./ui/essentials/Input";
import Title from "./ui/essentials/Title";
import Paragraph from "./ui/essentials/Paragraph";
import Header from "./ui/utilities/Header"; 
import { useRouter } from "next/navigation"; 
import Button from "./ui/essentials/Button";
import DeliveryCard from "./ui/cards/DeliveryCard";
import ChatMessage from "./ui/utilities/ChatMessage";
import AccessButton from "./ui/navigation/AccessButton";


export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const router = useRouter();

  return (
    <>
      <Header text="U mandaditos" />

      <AccessButton icon={"sendMail"} text={"Tus mandaditos"}/>
      <AccessButton icon={"runnerIcon2"} text={"Tus entregas"}/>
      <AccessButton icon={"reviews"} text={"Tus reseñas"}/>

      <div className="p-4">
        <Title text="U mandaitos" />

        <Paragraph children={"Bienvenido a umandaditos"} />

        <Input
          width="30%"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          value={inputValue}
          onChange={handleInputChange}
          name="nombre"
        />

        <button onClick={() => router.push('/about')}>Ir a mandaditos</button> 
        {/* Este botón es para hacer pruebas de enrutamiento */}

        <Button text={"Continuar"} width={"10%"}/>
        <DeliveryCard />
        <ChatMessage text={"Hola, Donde esta ubicado?"} hour={"12:00PM"} isMine={false}/>
        <ChatMessage text={"Estoy por el polideportivo en el aula 402."} hour={"12:01PM"} isMine={true}/>
        <ChatMessage text={"Listo."} hour={"12:03PM"} isMine={false}/>
      </div>
    </>
  );
}