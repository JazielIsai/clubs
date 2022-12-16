import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ViewMembers } from './ViewMembers';

export const Members = () => {

    const navigate = useNavigate();


    const handleGoAddEvidence = () => {
        navigate('/admin/members/add')
    }


    return (
        <div className='container'>
    
            <div className='d-flex justify-content-end'>
                <button onClick={handleGoAddEvidence} className='btn btn-outline-primary'> Agregar miembro </button>
            </div>
    
            <div className=''>
                <h1>Evidencias</h1>
                <ViewMembers />
            </div>

        </div>
    )
}
