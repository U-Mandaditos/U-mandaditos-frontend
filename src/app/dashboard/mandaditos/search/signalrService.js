import { HubConnectionBuilder } from "@microsoft/signalr";
import { API_URL } from "@/app/utils/settings";

export const connectSignalR = async ()=>{
    
    //Creamos la conexion con el hub
    const connection = new HubConnectionBuilder()
    .withUrl(`${API_URL}/hubRequest`)
    .build();

    //Establecemos la conexion
    try {
        await connection.start();
        return connection;
    } catch (error) {
        console.error("Error al conectar la hub: " , error);
        return null;
    }
}