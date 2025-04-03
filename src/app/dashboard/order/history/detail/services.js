import { API_URL } from "@/app/utils/settings"

export const getMandadito = async (token, mandaditoId)=>{
    try {
        const response = await fetch(`${API_URL}/api/mandadito/${mandaditoId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`}
        });
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}