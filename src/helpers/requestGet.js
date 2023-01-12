import { urlDB } from "../Shared/baseUrl";

export async function requestGet (serviceName) {

    try {
        const responseGet = await fetch(urlDB.concat(serviceName))
        const response = responseGet.text();
        return response;

    }catch (err) {
        console.log(err)
    }
    
}