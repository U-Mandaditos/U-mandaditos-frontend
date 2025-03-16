export const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Debe tener al menos 6 caracteres';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Debe contener al menos una letra mayúscula';
    }

    if (!/[\W_]/.test(password)) {
      return 'Debe contener al menos un carácter especial';
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
      return 'No debe contener una secuencia de números';
    }

    return '';
  };

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }

  return '';
}

export const validateName = (name) => {
    if (validateSqlInjection(name)) {
      return 'Nombre inválido';
    }

    return '';
};

export const validateEmail = (email) => {
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return 'Correo electrónico inválido';
    }

    return '';
};

const validateSqlInjection = (input) => {
    // Verifica caracteres especiales y palabras reservadas de SQL
    const sqlInjectionPattern = /['"%;()*<>]/;
    const sqlKeywordsPattern = /\b(SELECT|INSERT|DELETE|UPDATE|JOIN|MERGE|EXEC|CALL|DROP|UNION|CREATE|ALTER|TRUNCATE|REPLACE)\b/i;

    // Retorna true si encuentra caracteres especiales o palabras clave SQL
    return sqlInjectionPattern.test(input) || sqlKeywordsPattern.test(input);
};