import { API_URL } from "@/app/utils/settings";

export const getUser = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/user/get`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`Error al obtener el usuario: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getCareers = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/careers`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`Error al obtener el usuario: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}


export const updateProfile = async (postData, token) => {
    try {
        const response = await fetch(`${API_URL}/api/user/update`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` },
            body: postData,
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
}