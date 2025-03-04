'use client'
import { useState } from "react";
import Input from "./ui/essentials/Input";
import Title from "./ui/essentials/Title";
import Paragraph from "./ui/essentials/Paragraph";
import Button from "./ui/essentials/Button";
import DeliveryCard from "./ui/cards/DeliveryCard";


export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
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
      <Button text={"Continuar"} width={"10%"}/>
      <DeliveryCard />
    </div>
  );
}
