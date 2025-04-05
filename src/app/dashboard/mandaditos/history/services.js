import { API_URL } from "@/app/utils/settings";

const getHistory = async (token) => {
    try {
        // 2. Hacer la petición usando el IdUser obtenido
        const response = await fetch(`${API_URL}/api/mandadito/history`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getHistyory:", error);
        throw error; // Re-lanzar el error para manejo externo
    }
};


export { getHistory }