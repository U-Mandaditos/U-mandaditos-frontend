import { API_URL } from "@/app/utils/settings";

const createPost = async (postData, token) => {
    try {
        const response = await fetch(`${API_URL}/api/posts/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en fetchData:", error);
    }
}

const getLocations = async(token)=>{
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
        console.error("Error en fetchData:", error);
    }
}

export { createPost, getLocations}