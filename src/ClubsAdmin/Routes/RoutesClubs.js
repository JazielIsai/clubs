import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from '../../Includes/Footer';
import { Header } from '../../Includes/Header';
import { RegisterUser } from '../Accounts/RegisterUser';
import { ViewUsers } from '../Accounts/ViewUsers';
import { Dashboard } from '../Dashboard/Dashboard';
import { RegisterClub } from '../RegisterClub/RegisterClub';
import { ViewsClubs } from '../RegisterClub/ViewsClubs';
import { DashboardByClub } from '../../ClubsGroup/Dashboard/DashboardByClub';
import { Activities } from '../../ClubsGroup/Activities/Activities';
import { NewActivite } from '../../ClubsGroup/Activities/NewActivite';
import { EditActivitie } from '../../ClubsGroup/Activities/EditActivitie';
import { Evidences } from '../../ClubsGroup/Evidences/Evidences';
import { AddEvidences } from '../../ClubsGroup/Evidences/AddEvidences';
import { EditEvidences } from '../../ClubsGroup/Evidences/EditEvidences';


export const RoutesClubs = () => {
  return (
    <div className='d-flex w-100 flex-column' >
      <Header />
        <div className='' style={{minHeight: 'calc(100vh - 120px - 100px)'}} >
            <Routes>

              <Route path="dashboard" element={<Dashboard />} />
              <Route path='registerClub' element={<RegisterClub />} />
              
              <Route path="viewClubs" element={<ViewsClubs />} />
              <Route path="viewClubs/:id" element={<DashboardByClub />} />
              <Route path="registerClub" element={<RegisterClub />} />
              
              <Route path="activities" element={<Activities />} />
              <Route path='activities/add' element={<NewActivite />} />
              <Route path='activities/edit/:id' element={<EditActivitie/>} />
              
              <Route path='evidences' element={<Evidences />} />
              <Route path='evidences/add' element={<AddEvidences />} />
              <Route path='evidences/edit/:id' element={<EditEvidences />} />

              <Route path='members' element={<div>Members</div>} />
              <Route path='members/add' element={<div>AddMembers</div>} />
              <Route path='members/edit/:id' element={<div>EditMembers</div>} />

              <Route path="viewUsers" element={<ViewUsers />} />
              <Route path='registerUsers' element={<RegisterUser />} />          

              
              <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
        </div>
        <Footer />
    </div>
  )
}
