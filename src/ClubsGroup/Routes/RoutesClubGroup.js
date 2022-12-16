import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from '../../Includes/Footer'
import { Header } from '../../Includes/Header'
import { Activities } from '../Activities/Activities'
import { EditActivitie } from '../Activities/EditActivitie'
import { NewActivite } from '../Activities/NewActivite'
import { EditClub } from '../Club/EditClub'
import { DashboardByClub } from '../Dashboard/DashboardByClub'
import { AddEvidences } from '../Evidences/AddEvidences'
import { EditEvidences } from '../Evidences/EditEvidences'
import { Evidences } from '../Evidences/Evidences'

export const RoutesClubGroup = () => {
    
  
    return (
        <div className='d-flex w-100 flex-column' >
            <Header />
            <div style={{minHeight: 'calc(100vh - 120px - 100px)'}} >
                <Routes>

                    <Route path='dashboard' element={<DashboardByClub />} />
                    <Route path='updateClub' element={<EditClub />} />
                    <Route path='activities' element={<Activities />} />
                    <Route path='activities/add' element={<NewActivite />} />
                    <Route path='activities/edit/:id' element={<EditActivitie/>} />
                    <Route path='evidences' element={<Evidences />} />
                    <Route path='evidences/add' element={<AddEvidences />} />
                    <Route path='evidences/edit/:id' element={<EditEvidences />} />
                    <Route path='members' element={<div>Members</div>} />
                    <Route path='members/add' element={<div>AddMembers</div>} />
                    <Route path='members/edit' element={<div>EditMembers</div>} />
                    <Route path='members/assign' element={<div>AssignMembers</div>} />
                    
                    <Route path='/*' element={<Navigate to={'/club/dashboard'} />} />
                    
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
