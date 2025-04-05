'use client'

import Header from "@/app/ui/utilities/Header";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeliveryListByDate from "@/app/ui/utilities/DeliveryListByDate";
import { getHistory } from "./services";

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
        <Header router={router} text={"Tus entregas"}/>
        <DeliveryListByDate data={history}/>
        </>
    )
}