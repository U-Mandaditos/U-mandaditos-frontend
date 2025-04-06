import { API_URL } from "@/app/utils/settings";

const getUser = async (token) => {
    try {
        // 2. Hacer la petición usando el IdUser obtenido
        const response = await fetch(`${API_URL}/api/user/get`, {
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
        console.error("Error en getUser:", error);
        throw error; // Re-lanzar el error para manejo externo
    }
};

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

const getPosts = async(token)=>{
    try {
        const response = await fetch(`${API_URL}/api/posts/active`, {
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

const getPostsByRuner = async(token)=>{
    try {
        const response = await fetch(`${API_URL}/api/mandadito/runner/`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const dt = await response.json();

        if(dt.success) {
            return dt.data;
        }

        return [];

    } catch (error) {
        console.error("Error en fetchData:", error);
    }
}

export { getUser, getLocations, getPosts, getPostsByRuner };