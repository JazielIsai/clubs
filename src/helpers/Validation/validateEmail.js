export function validateEmail(email){
    const emailValidator = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!emailValidator.test(email)){
        return "Correo electrónico no válido.";
    } else {
        return "";
    }
}