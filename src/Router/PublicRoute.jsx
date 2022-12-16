import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Auth"

export const PublicRoutes = ({children}) => {
  
    const {logged, rol_user} = useContext(AuthContext)

    return ( !logged )
        ? children
        : <Navigate to="/admin" />
}