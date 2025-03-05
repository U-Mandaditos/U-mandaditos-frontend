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


export default function Home() {
  const [inputValue, setInputValue] = useState('');


  const sendAction = () => {
    console.log("hola")
  }
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const router = useRouter();

  return (
    <>
      <Header text={"Tus mandaditos"} router={router}/>

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

      <IconButton onClick={() => router.push('/about')}  icon={'arrow_back.svg'} disabled={true} hover={false} />
      <OfferCard postUser={user.postUser} offerInfo={user.offerInfo} priceSuggested={user.priceSuggested} isSelected={user.isSelected} />

      <ReviewCard postUser={review.postUser} coment={review.coment} comentDate={review.comentDate} isPosted={review.isPosted} isSelected={review.isSelected}/>

      <SendInput sendAction={sendAction}/>

      <LocationSelect text={location.text} optionList={location.optionList} />

      <button onClick={() => router.push('/about')}>Ir a mandaditos</button> 
      {/* Este botón es para hacer pruebas de enrutamiento */}

    </>
  );
}