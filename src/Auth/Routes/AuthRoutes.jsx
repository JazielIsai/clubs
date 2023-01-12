
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login, Register } from '../Pages/Login'

export const AuthRoutes = () => {
    
    
    
    return (
        <Routes>
            <Route 
                path='login'
                element={<Login />}
            />

            <Route path='/*' element={<Navigate to={'/auth/login'} />} />
            
        </Routes>
    )
}
