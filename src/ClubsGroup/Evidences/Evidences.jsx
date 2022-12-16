import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ViewEvidences } from './ViewEvidences';

export const Evidences = () => {

  const navigate = useNavigate();


  const handleGoAddEvidence = () => {
    navigate('/admin/evidences/add')
  }

  return (
    <div className='container'>
        <div className='d-flex justify-content-end'>
          <button onClick={handleGoAddEvidence} className='btn btn-outline-primary'> Agregar evidencia </button>
        </div>
        <div className=''>
            <h1>Evidencias</h1>
            <ViewEvidences />
        </div>
    </div>
  )
}
