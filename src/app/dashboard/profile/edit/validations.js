export const validateRequiredForm = (formData) => {
    if(Object.values(formData).some(value => value === '')){
        return "Debes llenar todos los campos para poder crear un post."
    }
}

export const validateName = (name)=>{
    if (name.length < 6 || name.length > 50) {
        return "Tu título debe contener al menos 6 caracteres y máximo 50 caracteres"
    }
    return ''
}