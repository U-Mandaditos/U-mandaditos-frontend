'use client'
import { useState } from "react";
import Input from "./ui/essentials/Input";
import Title from "./ui/essentials/Title";
import Paragraph from "./ui/essentials/Paragraph";
import Header from "./ui/utilities/Header"; 
import { useRouter } from "next/navigation"; 
import IconButton from "./ui/buttons/IconButton";
import OfferCard from "./ui/cards/OfferCard";
import ReviewCard from "./ui/cards/ReviewCard";
import SendInput from "./ui/utilities/SendInput";
import LocationSelect from "./ui/utilities/LocationSelect";
import { review, user, location } from "../../data";
import DeliveryCard from "./ui/cards/DeliveryCard";


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


<DeliveryCard />
      </div>
    </>
  );
}