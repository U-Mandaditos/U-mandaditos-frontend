'use client'

import Header from "@/app/ui/utilities/Header";
import { useRouter } from "next/navigation";
import React from "react";
import DeliveryListByDate from "@/app/ui/utilities/DeliveryListByDate";

const data = [
    {
        date: Date.now(),
        mandaditos: {
            locations: [
                {
                    key: 1,
                    name: "B2"
                },
                {
                    key: 2,
                    name: "Polideportivo"
                }
            ],
            deliverys: [
                {
                    key: 1,
                    pickUpLocation: "B2",
                    deliveryLocation: "Polideportivo",
                    deliveryHour: "3:00 pm",
                    deliveryTitle: "Alitas del CC",
                    runnerName: "Angel Fernando Castillo",
                    status: 1,
                    price: "L 20.00"
                },
                {
                    key: 2,
                    pickUpLocation: "B2",
                    deliveryLocation: "Polideportivo",
                    deliveryHour: "3:00 pm",
                    deliveryTitle: "Alitas del CC",
                    runnerName: "Angel Fernando Castillo",
                    status: 2,
                    price: "L 20.00"
                }
            ]
        }
    },
    {
        date: new Date(2025, 1, 28),
        mandaditos: {
            locations: [
                {
                    key: 1,
                    name: "B2"
                },
                {
                    key: 2,
                    name: "Polideportivo"
                }
            ],
            deliverys: [
                {
                    key: 2,
                    pickUpLocation: "B2",
                    deliveryLocation: "Polideportivo",
                    deliveryHour: "3:00 pm",
                    deliveryTitle: "Alitas del CC",
                    runnerName: "Angel Fernando Castillo",
                    status: 2,
                    price: "L 20.00"
                }
            ]
        }
    },
    {
        date: new Date(2025, 1, 1),
        mandaditos: {
            locations: [
                {
                    key: 1,
                    name: "B2"
                },
                {
                    key: 2,
                    name: "Polideportivo"
                }
            ],
            deliverys: [
                {
                    key: 1,
                    pickUpLocation: "B2",
                    deliveryLocation: "Polideportivo",
                    deliveryHour: "3:00 pm",
                    deliveryTitle: "Alitas del CC",
                    runnerName: "Angel Fernando Castillo",
                    status: 1,
                    price: "L 20.00"
                },
                {
                    key: 2,
                    pickUpLocation: "B2",
                    deliveryLocation: "Polideportivo",
                    deliveryHour: "3:00 pm",
                    deliveryTitle: "Alitas del CC",
                    runnerName: "Angel Fernando Castillo",
                    status: 2,
                    price: "L 20.00"
                }
            ]
        }
    }
]

export default function Page() {
    const router = useRouter();

    return (
        <>
        <Header router={router} text={"Tus entregas"}/>
        <DeliveryListByDate data={data}/>
        </>
    )
}