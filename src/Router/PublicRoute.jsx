import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../Auth"

export const PublicRoutes = ({children}) => {
  
    const {logged, user} = useContext(AuthContext)

    return ( !logged )
        ? children
        : user.rol_user === 'Administrador' ? <Navigate to="/admin" /> : <Navigate to="/club" />
}