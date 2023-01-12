import React, {useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ViewMembers } from './ViewMembers';
import {AuthContext} from "../../Auth";

export const Members = () => {

    const {club_id} = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleGoAddMember = () => {
        if (user.id_club == null){
            navigate(`/admin/members/add/${club_id}`)
        } else {
            navigate(`/club/members/add/${club_id}`)
        }
    }


    return (
        <div className='container'>
    
            <div className='d-flex justify-content-end'>
                <button onClick={handleGoAddMember} className='btn btn-outline-primary'> Agregar miembro </button>
            </div>
    
            <div className=''>
                <h1>Miembors del Club</h1>
                <ViewMembers />
            </div>

        </div>
    )
}
