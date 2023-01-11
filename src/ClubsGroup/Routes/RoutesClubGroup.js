import React, {useContext, useEffect} from 'react'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import { Footer } from '../../Includes/Footer'
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
import {HeaderUser} from "../../Includes/HeaderUser";
import {AuthContext} from "../../Auth";
import {ViewEvidences} from "../Activities/Evidences/ViewEvidences";
import {EvaluatePerformance} from "../Activities/EvaluatePerformance/EvaluatePerformance";
import {Events} from "../Activities/Events/Events";

export const RoutesClubGroup = () => {

    const { user } = useContext(AuthContext); // Get the context

    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate(`/club/dashboard/${user.id_club}`);
        }
    }, [user]);

    return (
        <div className='d-flex w-100 flex-column' >
            <HeaderUser />
            <div style={{minHeight: 'calc(100vh - 120px - 100px)'}} >
                <Routes>

                    <Route path='dashboard/:id' element={<DashboardByClub />} />
                    
                    <Route path='updateClub/:club_id' element={<EditClub />} />
                    
                    <Route path='activities/:club_id' element={<Activities />} />
                    <Route path='activities/add/:club_id' element={<NewActivite />} />
                    <Route path='activities/edit/:club_id/:id_activitie' element={<EditActivitie/>} />

                    <Route path='evidences/:club_id/' element={<ViewEvidences />} />
                    <Route path='activities/evidences/:id_activitie/:nameActivitie' element={<Evidences />} />
                    <Route path='activities/evidences/add/:id_activitie' element={<AddEvidences />} />
                    <Route path='activities/evidences/edit/:club_id/:id_evidence' element={<EditEvidences />} />

                    <Route path='activities/evaluateMember/:club_id/:idActivity/:nameActivity' element={<EvaluatePerformance /> } />
                    
                    <Route path='members/:club_id' element={<Members />} />
                    <Route path='members/add/:club_id' element={<AddMember />} />
                    <Route path='members/edit/:club_id/:id_member' element={<EditMember />} />
                    
                    <Route path='events_public' element={<Events />} />
                    
                    <Route path='/*' element={<Navigate to={`/club/dashboard/${user.id_club}`} />} />
                    
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
