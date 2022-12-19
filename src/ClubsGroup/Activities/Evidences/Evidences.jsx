import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import { ViewEvidences } from './ViewEvidences';

export const Evidences = () => {

  const navigate = useNavigate();
  const { id_activitie, nameActivitie } = useParams();
  
  const { data: activitiesById } = useFetch_RequestGet(`get_activities_by_id&activities_id=${id_activitie}`);
  const {data: evidencesByActivitie} = useFetch_RequestGet(`get_evidences_by_activity&id_activity=${id_activitie}`)

  const [ getDataActivities, setDataActivities ] = useState();
  const [ getDataEvidences, setDataEvidences ] = useState();

  const handleGoAddEvidence = () => {
    navigate('/admin/evidences/add')
  }

  useEffect( () => {
    try {

      setDataActivities(JSON.parse(activitiesById)[0]);
      setDataEvidences(JSON.parse(evidencesByActivitie));

    } catch (err) {
      console.log(err);
    }
  }, [activitiesById, evidencesByActivitie] )


  return (
    <div className='container'>
        <div className='d-flex justify-content-end'>
          <button onClick={handleGoAddEvidence} className='btn btn-outline-primary'> Agregar evidencia </button>
        </div>
        <div className=''>
          {nameActivitie}
        </div>
        <div className=''>
            <h1>Evidencias</h1>
            {/* <ViewEvidences /> */}
        </div>
    </div>
  )
}
