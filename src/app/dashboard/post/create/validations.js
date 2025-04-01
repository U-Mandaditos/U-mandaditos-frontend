import { validateSqlInjection } from "@/app/utils/validators";

export const validateTitle = (title)=>{
    if (validateSqlInjection(title)) {
        return "Parece que el titulo que has ingresado tiene alguna sentencia ilegal."
    }
    if (title.length < 6 || title.length > 20) {
        return "Tu título debe contener al menos 6 caracteres y máximo 20 caracteres"
    }
    return ''
}

export const validateLocations = (pickupLocation, deliveryLocation)=>{
    if (pickupLocation === deliveryLocation) {
        return "La dirección de recogida debe ser distinta a la dirección de entrega. Por favor, cambia una de las dos."
    }
    return ''
}

export const validateDescription = (description) => {
    if (description.length < 6 || description.length > 100) {
        return "Tu título debe contener al menos 6 caracteres y máximo 100 caracteres"
    }
}

export const validateRequiredForm = (formData) => {
    if(Object.values(formData).some(value => value.trim() === '')){
        return "Debes llenar todos los campos para poder crear un post."
    }
}
