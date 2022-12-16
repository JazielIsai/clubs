import { useReducer } from "react";
import { types } from "../Types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const initialState = {
    logged: false,
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, initialState, init);

    const login = (dataUser) => {
        const user = {
            user_id:dataUser.user_id,
            name:dataUser.name,
            lastname:dataUser.lastname,
            email: dataUser.email,
            rol_user:dataUser.rol_user
        }

        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
            type: types.login,
            payload: user
        })
    }
    
    const editInfoUser = (dataUser) => {
        
        const user = {
            user_id:dataUser.user_id,
            name:dataUser.name,
            lastname:dataUser.lastname,
            email: dataUser.email,
            rol_user:dataUser.rol_user
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage.getItem('user'));
            
    }

    const logout = () => {
        localStorage.removeItem('user');

        dispatch({
            type: types.logout,
        })
    }

    return (
        <AuthContext.Provider 
            value={{
                ...authState,
                login,
                editInfoUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}