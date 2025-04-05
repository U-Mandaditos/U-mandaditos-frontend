'use client'

import Header from "@/app/ui/utilities/Header";
import { useRouter } from "next/navigation";
import DeliveryListByDate from "@/app/ui/utilities/DeliveryListByDate";
import { getHistory } from "./services";
import { useEffect, useState } from "react";


const dataa = [
    {
        "6 de junio": [
            {
                id: 6,
                title: "",
                description: "Pasta Alfredo",
                acceptedRate: 22.5,
                status: "Delivered",
                acceptedAt: "2023-06-06T08:20:00",
                deliveredAt: "2023-06-06T09:30:00",
                securityCode: "PQR678",
                pickupLocation: {
                    id: 7,
                    name: "Edificio J1",
                    address: ""
                },
                deliveryLocation: {
                    id: 11,
                    name: "Edificio Alma Máter",
                    address: ""
                }
            },
            {
                id: 3,
                title: "",
                description: "Pasta Alfredo",
                acceptedRate: 22.5,
                status: "Delivered",
                acceptedAt: "2023-06-06T08:20:00",
                deliveredAt: "2023-06-06T09:30:00",
                securityCode: "PQR678",
                pickupLocation: {
                    id: 7,
                    name: "Edificio J1",
                    address: ""
                },
                deliveryLocation: {
                    id: 11,
                    name: "Edificio Alma Máter",
                    address: ""
                }
            }
        ]
    },
    {
        "7 de junio": [
            {
                id: 1,
                title: "",
                description: "Pasta Alfredo",
                acceptedRate: 22.5,
                status: "Delivered",
                acceptedAt: "2023-06-06T08:20:00",
                deliveredAt: "2023-06-06T09:30:00",
                securityCode: "PQR678",
                pickupLocation: {
                    id: 7,
                    name: "Edificio J1",
                    address: ""
                },
                deliveryLocation: {
                    id: 11,
                    name: "Edificio Alma Máter",
                    address: ""
                }
            },
            {
                id: 2,
                title: "",
                description: "Pasta Alfredo",
                acceptedRate: 22.5,
                status: "Delivered",
                acceptedAt: "2023-06-06T08:20:00",
                deliveredAt: "2023-06-06T09:30:00",
                securityCode: "PQR678",
                pickupLocation: {
                    id: 7,
                    name: "Edificio J1",
                    address: ""
                },
                deliveryLocation: {
                    id: 11,
                    name: "Edificio Alma Máter",
                    address: ""
                }
            }
        ]
    }
];

export default function Page() {
    const router = useRouter();
    const [history, setHistory] = useState([]);

    useEffect(()=>{
        const fetchHistory = async ()=>{
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            try {
                const data = await getHistory(token);
                setHistory(Array.isArray(data) ? data : []); 
                console.log(data);
            } catch (error) {
                console.error("Error fetching history:", error);
                setHistory([]);
            } 
        }
        fetchHistory();
    }, [router]);
    

    return (
        <>
        <Header router={router} text={"Tus mandaditos"} />
        <DeliveryListByDate data={history} />
        </>
    )
}