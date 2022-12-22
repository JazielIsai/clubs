import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext, AuthRoutes } from '../Auth'
import { RoutesClubs } from '../ClubsAdmin/Routes/RoutesClubs'
import { RoutesClubGroup } from '../ClubsGroup/Routes/RoutesClubGroup'
import { PrivateRoutes } from './PrivateRoute'
import { PublicRoutes } from './PublicRoute'


export const Router = () => {
    
    const { user } = useContext( AuthContext );

    return (
        <div className='d-flex flex-column w-100 mw-100' style={{"minHeight": "calc(100% - 60px)"}}>
            <main className='d-flex w-100 h-100 mw-100 mh-100'>
                <Routes>
                
                    <Route
                        path='auth/*'
                        element={
                            <PublicRoutes>
                                <AuthRoutes />
                            </PublicRoutes>
                        }
                    />

                    {
                        user && user.id_club == null &&
                            user.rol_user === 'Administrador' ? (
                            <Route
                                path='admin/*'
                                element={
                                    <PrivateRoutes>
                                        <RoutesClubs />
                                    </PrivateRoutes>
                                }
                            />
                        ) : (
                            <Route path="/*" element={<Navigate to="/club" />} />
                        )
                    }

                    {
                        user && user.id_club != null ? (
                            <Route
                                path='club/*'
                                element={
                                    <PrivateRoutes>
                                        <RoutesClubGroup />
                                    </PrivateRoutes>
                                }
                            />
                        ) : (
                            <Route path="/*" element={<Navigate to="/admin" />} />
                        )
                    }

                    <Route path="/" element={<Navigate to="/auth" />} />
                
                </Routes>
            </main>
        </div>
    )
}
