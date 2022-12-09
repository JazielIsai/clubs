import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from '../../Includes/Footer';
import { Header } from '../../Includes/Header';
import { RegisterUser } from '../Accounts/RegisterUser';
import { ViewUsers } from '../Accounts/ViewUsers';
import { Dashboard } from '../Dashboard/Dashboard';
import { RegisterClub } from '../RegisterClub/RegisterClub';
import { ViewsClubs } from '../RegisterClub/ViewsClubs';


export const RoutesClubs = () => {
  return (
    <div className='d-flex w-100 flex-column' >
      <Header />
        <div >
            <Routes>

              <Route path="dashboard" element={<Dashboard />} />
              <Route path='registerClub' element={<RegisterClub />} />
              <Route path="viewClubs" element={<ViewsClubs />} />
              <Route path="viewUsers" element={<ViewUsers />} />
              <Route path='registerUsers' element={<RegisterUser />} />          

              
              <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
        </div>
        <Footer />
    </div>
  )
}
