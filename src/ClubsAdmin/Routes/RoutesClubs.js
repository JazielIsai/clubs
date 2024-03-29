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
import { Evidences } from '../../ClubsGroup/Activities/Evidences/Evidences';
import { AddEvidences } from '../../ClubsGroup/Activities/Evidences/AddEvidences';
import { EditEvidences } from '../../ClubsGroup/Activities/Evidences/EditEvidences';
import { EditClub } from '../../ClubsGroup/Club/EditClub';
import { UpdateUser } from '../Accounts/UpdateUser';
import { AdminGeneral } from '../AdminGeneral/AdminGeneral';
import { Members } from '../../ClubsGroup/Members/Members';
import { AddMember } from '../../ClubsGroup/Members/AddMember';
import { EditMember } from '../../ClubsGroup/Members/EditMember';
import {EvaluatePerformance} from "../../ClubsGroup/Activities/EvaluatePerformance/EvaluatePerformance";
import {ViewEvidences} from "../../ClubsGroup/Activities/Evidences/ViewEvidences";
import {ViewEvidenceByActivity} from "../../ClubsGroup/Activities/Evidences/ViewEvidenceByActivity";
import {Events} from "../../ClubsGroup/Activities/Events/Events";
import {Reports} from "../../ClubsGroup/Reports/Reports";


export const RoutesClubs = () => {
  return (
    <div className='d-flex w-100 flex-column' >
      <Header />
        <div className='' style={{minHeight: 'calc(100vh - 120px - 100px)'}} >
            <Routes>

              <Route path="dashboard" element={<Dashboard />} />

              <Route path='registerClub' element={<RegisterClub />} />
              <Route path='updateClub/:club_id' element={<EditClub />} />
              
              <Route path="viewClubs" element={<ViewsClubs />} />
              <Route path="viewClubs/:id/:club_name" element={<DashboardByClub />} />
              <Route path="registerClub" element={<RegisterClub />} />
              
              <Route path="activities/:club_id/:club_name" element={<Activities />} />
              <Route path='activities/add/:club_id' element={<NewActivite />} />
              <Route path='activities/edit/:club_id/:id_activitie' element={<EditActivitie/>} />

              <Route path='evidences/:club_id/' element={<ViewEvidences />} />
              <Route path='activities/evidences/:club_id/:name_club/:id_activitie/:nameActivitie' element={<Evidences />} />
              <Route path='activities/evidences/add/:id_activitie' element={<AddEvidences />} />
              <Route path='activities/evidences/edit/:club_id/:id_evidence' element={<EditEvidences />} />
              <Route path={'activities/view_evidencie_by_activity/:activity_id/:activity_name'} element={<ViewEvidenceByActivity />} />

              <Route path='activities/evaluateMember/:club_id/:idActivity/:nameActivity' element={<EvaluatePerformance /> } />


              <Route path='members/:club_id' element={<Members />} />
              <Route path='members/add/:club_id' element={<AddMember />} />
              <Route path='members/edit/:club_id/:id_member' element={<EditMember />} />

              <Route path='events_public' element={<Events />} />

              <Route path={'reports_by_club/:club_id'} element={<Reports />} />

              <Route path="viewUsers" element={<ViewUsers />} />
              <Route path='registerUsers' element={<RegisterUser />} />
              <Route path='updateUser/:user_id' element={<UpdateUser />} />
    
              <Route path="adminGeneral" element={<AdminGeneral />} />
              
              <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
        </div>
        <Footer />
    </div>
  )
}
