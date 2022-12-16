import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ViewActivities } from './ViewActivities'

export const Activities = () => {

  const navigate = useNavigate();

  const handleGoAddActivity = () => {
    navigate('/admin/activities/add')
  }

  return (
    <div className='container'>
        <div>
            <h1>Activities</h1>
        </div>
        <div className='d-flex justify-content-end'>
            <button onClick={handleGoAddActivity} className='btn btn-primary'> Agregar una nueva actividad </button>
        </div>
        <div className=''>
            <ViewActivities />
        </div>
    </div>
  )
}
