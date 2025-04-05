import { FlexContainer } from "../essentials/FlexBox";
import React from "react";
import DeliveryCard from "../cards/DeliveryCard";
import Title from "../essentials/Title";


export default function DeliveryListByDate({ data }) {
    return (
        <FlexContainer direction="column" gap="15px" className="p-4">
            {data.map((dateGroup) => {
                // Extraemos la fecha (ej: "6 de junio") y los mandaditos asociados
                const [date, deliveries] = Object.entries(dateGroup)[0];
                
                return (
                    <React.Fragment key={date}>
                        <Title 
                            text={date}  // Ya está formateado como "6 de junio"
                            weight={"450"} 
                            size={"20px"} 
                            className={"mb-2"} 
                        />
                        <FlexContainer direction="column" gap="10px">
                            {deliveries.map((delivery) => (
                                <DeliveryCard 
                                    key={delivery.id}
                                    pickUpLocation={delivery.pickupLocation?.name || ""} 
                                    deliveryLocation={delivery.deliveryLocation?.name || ""}
                                    deliveryHour={new Date(delivery.acceptedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    deliveryTitle={delivery.title || delivery.description}
                                    runnerName={""} // No está en los datos, puedes ajustarlo
                                    status={delivery.status}
                                    price={`${delivery.acceptedRate}`}
                                />
                            ))}
                        </FlexContainer>
                    </React.Fragment>
                );
            })}
        </FlexContainer>
    );
}