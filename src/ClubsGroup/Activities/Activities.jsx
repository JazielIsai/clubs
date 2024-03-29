import React, {useContext} from 'react';
import {AuthContext} from "../../Auth";
import { useNavigate, useParams } from 'react-router-dom';
import { ViewActivities } from './ViewActivities'

export const Activities = () => {

  const navigate = useNavigate();
  const { club_id, club_name } = useParams();
  const { user } = useContext(AuthContext);

  const handleGoAddActivity = () => {
      if (user?.id_club == null) {
          navigate('/admin/activities/add/'+club_id);
      } else {
          navigate(`/club/activities/add/${club_id}`);
      }
  }

  return (
    <div className='container'>
        <div>
            <h1 className={'fs-2 mt-2 mb-0 text-capitalize'} >Actividades</h1>
        </div>
        <div className='d-flex justify-content-end'>
            <button onClick={handleGoAddActivity} className='btn btn-outline-primary'> Agregar una nueva actividad </button>
        </div>
        <div className=''>
            <ViewActivities />
        </div>
    </div>
  )
}
