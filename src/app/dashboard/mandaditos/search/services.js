import { API_URL } from "@/app/utils/settings";

export const getLocations = async(token)=>{
    try {
        const response = await fetch(`${API_URL}/api/locations/`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getLocations:", error);
    }
}

export const getNearPosts = async (token, idLocation)=>{
    try {
        const response = await fetch(`${API_URL}/api/posts/near?currentLocationId=${idLocation}`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getNearPosts:", error);
    }
}