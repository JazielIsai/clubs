export function validatePassword(password){
    const passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.]).{8,}/;
    if (!passwordValidator.test(password)){
        return "La contraseña debe contener al menos 8 caracteres, 1 número, 1 mayúscula y 1 minúscula y 1 carácter especial.";
    } else {
        return "";
    }
}