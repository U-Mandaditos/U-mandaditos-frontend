export const validatePassword = (password) => {
  if (password.length < 6) {
    return "Debe tener al menos 6 caracteres";
  }

  if (!/[A-Z]/.test(password)) {
    return "Debe contener al menos una letra mayúscula";
  }

  if (!/[\W_]/.test(password)) {
    return "Debe contener al menos un carácter especial";
  }

  if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
    return "No debe contener una secuencia de números";
  }

  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden";
  }

  return "";
};

export const validateName = (name) => {
  if (validateSqlInjection(name)) {
    return "Nombre inválido";
  }

  return "";
};

export const validateEmail = (email) => {
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return "Correo electrónico inválido";
  }

  return "";
};

export const validateCareer = (idCareer, careers) => {
  console.log(careers);
  if (!idCareer) {
    return "Debes seleccionar una carrera";
  }

  const career = careers.find((career) => career.id == idCareer);
  if (!career) {
    return "Carrera no válida";
  }

  return "";
};

export const validateDateOfBirth = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  const isOldEnough = age > 18 || (age === 18 && monthDiff >= 0);
  if (isOldEnough) {
    return "";
  }

  if (birthDate > today) {
    return "La fecha de nacimiento no puede ser futura";
  }

  if (age < 18) {
    return "Debes tener al menos 18 años para registrarte";
  }

  return "";
};

export const validateDNI = (dni) => {
  /* solo verifica si es numerico */
  if (isNaN(dni)) {
    return "Dato inválido";
  }
  /* verifica si tiene 13 digitos */
  const dniPattern = /^\d{13}$/;
  if (!dniPattern.test(dni)) {
    return "Dato inválido";
  }

  return "";
};

export const validateSqlInjection = (input) => {
    // Verifica caracteres especiales y palabras reservadas de SQL
    const sqlInjectionPattern = /['"%;()*<>]/;
    const sqlKeywordsPattern = /\b(SELECT|INSERT|DELETE|UPDATE|JOIN|MERGE|EXEC|CALL|DROP|UNION|CREATE|ALTER|TRUNCATE|REPLACE)\b/i;

  // Retorna true si encuentra caracteres especiales o palabras clave SQL
  return sqlInjectionPattern.test(input) || sqlKeywordsPattern.test(input);
};