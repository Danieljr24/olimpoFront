// utils/validationMessages.ts
const validationMessages = {
  required: 'Este campo es obligatorio.',
  email: 'Por favor, introduce un correo electrónico válido.',
  min: (min: number) => `Debe tener al menos ${min} caracteres.`,
  max: (max: number) => `No puede tener más de ${max} caracteres.`,
  specialCharacters: 'El nombre no puede contener caracteres especiales(/[!@#$%^&*(),.?":{}|<>]/).',
  password: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.',
  confirmPassword: 'Las contraseñas deben coincidir.',
  onlyNumbers: 'El documento solo puede contener números',
};

export default validationMessages;
