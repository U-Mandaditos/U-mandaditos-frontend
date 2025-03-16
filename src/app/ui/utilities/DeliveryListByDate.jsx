import { FlexContainer } from "../essentials/FlexBox";
import React from "react";
import { formatDate } from "@/app/utils/formatDate";
import DeliveryCard from "../cards/DeliveryCard";
import Title from "../essentials/Title";

export default function DeliveryListByDate( { data } ){
    return (
        <>
            <FlexContainer direction="column" gap="15px" className="p-4">
                {data.map((date) => 
                    <React.Fragment key={date.date}> {/* Agregado key en React.Fragment */}
                    <Title text={formatDate(date.date)} weight={"450"} size={"20px"} className={"mb-2"}/>
                    <FlexContainer direction="column" gap="10px">
                        {date.mandaditos.deliverys.map((delivery) =>
                            <DeliveryCard 
                                key={delivery.key}
                                pickUpLocation={delivery.pickUpLocation} 
                                deliveryLocation={delivery.deliveryLocation}
                                deliveryHour={delivery.deliveryHour} 
                                deliveryTitle={delivery.deliveryTitle}
                                runnerName={delivery.runnerName}
                                status={delivery.status}
                                price={delivery.price}
                            />
                        )}
                    </FlexContainer>
                    </React.Fragment>
                )}
            </FlexContainer>
        </>
    )
}