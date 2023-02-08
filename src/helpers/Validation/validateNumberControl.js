export function validateNumberControl(numberControl){
    const numberControlValidator = /^[A-Z]{3}\d{8}$/;
    if (!numberControlValidator.test(numberControl)){
        return "El número de control debe contener 11 caracteres y mayúsculas.";
    } else {
        return "";
    }
}