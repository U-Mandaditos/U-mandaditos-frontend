'use client'
import { useState } from "react";
import Input from "./ui/essentials/Input";
import Title from "./ui/essentials/Title";
import Paragraph from "./ui/essentials/Paragraph";
import Header from "./ui/utilities/Header"; 
import { useRouter } from "next/navigation"; 
import DeliveryCard from "./ui/cards/DeliveryCard";
import PostDeliveryCard from "./ui/cards/PostDeliveryCard";


export default function Home() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState('');


  const sendAction = () => {
    console.log("hola")
  }
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  return (
    <>
      <Header text="U mandaditos" />


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


<PostDeliveryCard />
      </div>
    </>
  );
}