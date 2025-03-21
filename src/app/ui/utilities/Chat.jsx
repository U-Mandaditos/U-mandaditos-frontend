'use client'
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import { FlexContainer } from "../essentials/FlexBox";
import SendInput from "./SendInput";
import ChatMessage from "./ChatMessage";

export default function Chat({mandaditoId, senderUserId}){

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    /**
     * Fetching de los mensajes en tiempo real
     */
    useEffect( ()=>{
        const q = query(collection(db, `chat/${mandaditoId}/messages`), orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot)=> {
            setMessages(
              snapshot.docs.map((doc) => {
                const data = doc.data()
                return{
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp
                      ? new Date(data.timestamp.seconds * 1000)
                      : null,
                }
              })
            );
        });

        return ()=>unsubscribe();
    },[]);


    const sendMessage = async ()=>{
        if (newMessage.trim() === "") return;

        await addDoc(collection(db, `chat/${mandaditoId}/messages`),{
            senderId: senderUserId,
            text: newMessage,
            timestamp: new Date(),
        })

        setNewMessage("");
    }


    return (
      <FlexContainer direction="column" justifycontent="space-between" height="100%">
        <FlexContainer direction="column" gap="10px">
            {messages.map((message, index)=>(<ChatMessage key={index} text={message.text} hour={message.timestamp.toLocaleString()} isMine={message.senderId === senderUserId}></ChatMessage>))}
        </FlexContainer>
        <SendInput sendAction={sendMessage} value={newMessage} handleChange={(e)=>{setNewMessage(e.target.value)}}></SendInput>
      </FlexContainer>
    );
}