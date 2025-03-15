import DeliveryCard from "@/app/ui/cards/DeliveryCard";
import ReviewCard from "@/app/ui/cards/ReviewCard";
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Header from "@/app/ui/utilities/Header";

import { useRouter } from "next/navigation";

const Icon = styled.svg`
  width: ${(props) => props.width || '14px'};
  height: auto;
  path {
    fill: ${(props) => props.color || props.theme.colors.foreground}; 
  }
`;

export default function Mandadito(){
    const router = useRouter();

    const delivery = {
            pickUpLocation: "B2",
            deliveryLocation: "Polideportivo",
            deliveryHour: "3:00 pm",
            deliveryTitle: "Alitas del CC",
            runnerName: "Angel Fernando Castillo",
            status: 1,
            price: "L 20.00"
    }

    const review = {
        user: {
            name: "Daniel Ochoa",
            image: "/img/pruebas/odin.svg",
            stars: 4,
        },
        coment: "Nunca llegó a entregar el producto.",
        comentDate: "08-03-2025",
        isPosted: true
    }

    return (
        <PageContainer>
            <Header text={"Tu entrega"} router={router} />
            <FlexContainer direction={"column"} gap={"2rem"}>
                <FlexContainer direction={"column"} gap={"2rem"} >
                    <Title text={"Descripción"} size={'2rem'} wwigt={'500'} className={'mb-2'}/>

                    <FlexContainer gap={'20px'}>
                        <Paragraph text={"Polideportivo"} weight={600} color={theme.colors.secondaryText}></Paragraph>
                    </FlexContainer>

                    <FlexContainer gap={'20px'}>
                        <Paragraph text={"B2"} weight={600} color={theme.colors.secondaryText}></Paragraph>
                    </FlexContainer>
                </FlexContainer>

                <div>
                    <Title text={"Descripción"} size={'2rem'} wwigt={'500'} className={'mb-2'}/>
                    <Paragraph text={"Ingeniería en Sistemas"} weight={600} color={theme.colors.secondaryText}></Paragraph>
                </div>

                <div>
                    <Title text={"Tarifa indicada"} size={'2rem'} wwigt={'500'} className={'mb-2'}/>
                    <Paragraph text={"Ingeniería en Sistemas"} weight={600} color={theme.colors.secondaryText}></Paragraph>
                    <Paragraph text={"Ingeniería en Sistemas"} weight={600} color={theme.colors.secondaryText}></Paragraph>
                </div>

                <div>
                    <Title text={"Oferta aceptada"} size={'2rem'} wwigt={'500'} className={'mb-2'}/>
                    <DeliveryCard 
                        pickUpLocation={delivery.pickUpLocation} 
                        deliveryLocation ={delivery.deliveryLocation}
                        deliveryHour={delivery.deliveryHour} 
                        deliveryTitle={delivery.deliveryTitle}
                        runnerName={delivery.runnerName}
                        status={delivery.status}
                        price={delivery.status}
                    />
                </div>

                <div>
                    <Title text={"Calificación"} size={'2rem'} wwigt={'500'} className={'mb-2'}/>
                    <ReviewCard postUser={review.user} isPosted={review.isPosted} coment={review.coment} comentDate={review.comentDate}></ReviewCard>                </div>

                <Button text={"Aceptar"} borderRadius={"30px"} paddingx={"60px"} paddingy={"8px"} className={"mr-6"}></Button>

            </FlexContainer>
        </PageContainer>
    )
}