import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Auth"

export const PrivateRoutes = ({children}) => {

    const { logged } = useContext(AuthContext);

    // it is going validate if the user is logged
    return ( logged )
        ? children
        : <Navigate to="/auth" />
}