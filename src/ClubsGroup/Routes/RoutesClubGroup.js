import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from '../../Includes/Footer'
import { Header } from '../../Includes/Header'
import { Activities } from '../Activities/Activities'
import { EditActivitie } from '../Activities/EditActivitie'
import { NewActivite } from '../Activities/NewActivite'
import { EditClub } from '../Club/EditClub'
import { DashboardByClub } from '../Dashboard/DashboardByClub'
import { AddEvidences } from '../Activities/Evidences/AddEvidences'
import { EditEvidences } from '../Activities/Evidences/EditEvidences'
import { Evidences } from '../Activities/Evidences/Evidences'
import { Members } from '../Members/Members'
import { AddMember } from '../Members/AddMember'
import { EditMember } from '../Members/EditMember'

export const RoutesClubGroup = () => {
    
  
    return (
        <div className='d-flex w-100 flex-column' >
            <Header />
            <div style={{minHeight: 'calc(100vh - 120px - 100px)'}} >
                <Routes>

                    <Route path='dashboard' element={<DashboardByClub />} />
                    
                    <Route path='updateClub' element={<EditClub />} />
                    
                    <Route path='activities/:club_id' element={<Activities />} />
                    <Route path='activities/add/:club_id' element={<NewActivite />} />
                    <Route path='activities/edit/:club_id/:id_activitie' element={<EditActivitie/>} />
                    
                    <Route path='activities/evidences/:id_activitie/:nameActivitie' element={<Evidences />} />
                    <Route path='activities/evidences/add/:id_activitie' element={<AddEvidences />} />
                    <Route path='activities/evidences/edit/:club_id/:id_evidence' element={<EditEvidences />} />
                    
                    <Route path='members/:club_id' element={<Members />} />
                    <Route path='members/add/:club_id' element={<AddMember />} />
                    <Route path='members/edit/:club_id/:id_member' element={<EditMember />} />
                    
                    <Route path='members/assign' element={<div>AssignMembers</div>} />
                    
                    <Route path='/*' element={<Navigate to={'/club/dashboard'} />} />
                    
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
