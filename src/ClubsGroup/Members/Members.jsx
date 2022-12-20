import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ViewMembers } from './ViewMembers';

export const Members = () => {

    const {club_id} = useParams();
    const navigate = useNavigate();


    const handleGoAddMember = () => {
        navigate(`/admin/members/add/${club_id}`)
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
