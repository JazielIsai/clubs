import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import { ViewEvidences } from './ViewEvidences';
import { AddEvidences } from './AddEvidences';
import {TableEvidences} from "./TableEvidences";

export const Evidences = () => {

  const navigate = useNavigate();
  const { id_activitie, nameActivitie } = useParams();
  
  const { data: activitiesById } = useFetch_RequestGet(`get_activities_by_id&activities_id=${id_activitie}`);

  const [ getDataActivities, setDataActivities ] = useState();
  
  const [buttonAddEvidences, setButtonAddEvidences]=useState(false);

  const handleGoAddEvidence = () => {
    navigate('/admin/evidences/add')
  }

  useEffect( () => {
    try {

      setDataActivities(JSON.parse(activitiesById)[0]);

    } catch (err) {
      console.log(err);
    }
  }, [activitiesById] )

  const handleNavigateToEditEvidence = (id_activitie) => {
    navigate(`/admin/evidences/edit/${id_activitie}`)
  }
  
  const handleAddEvidences=()=>{
    if (buttonAddEvidences==false)
    {setButtonAddEvidences(true);}
    else{
    setButtonAddEvidences(false);
    }
  }
  
  console.log("AddEvidence",buttonAddEvidences);

  return (
    <div className='container'>
        
        <div className='d-flex flex-column'>
          <div className='row d-flex'>
              <div className='col-md-2 d-flex justify-content-start pe-0'>
                <h2>Actividad:</h2>
              </div>
              <div className='col-md-10 fw-normal d-flex justify-content-start ps-0'>
                <h3 > 
                  {nameActivitie}
                </h3>
              </div>
            </div>

          <table className='table caption-top'>
            <caption>Descripción de la actividad:</caption>
            <thead>
              <tr>
                <th scope="col">  </th>
                <th scope="col">  </th>
              </tr>
            </thead>
            <tbody>
                {
                  getDataActivities !== undefined &&
                  getDataActivities !== null &&
                    Object.entries(getDataActivities).map( ([keyRow, valueRow], index) => {
                      if (keyRow == 'id') { return null; }
                      if (keyRow == 'objetivo_desarrollo_s') { 
                        keyRow = 'Objetivo de desarrollo sustentable';
                      }
                      if (keyRow == 'id_habilidad_desarrollada') {return null;}
                      if (keyRow == 'id_tipo_actividad') {return null;}
                      if (keyRow == 'id_club') {return null;}

                      keyRow = keyRow.replace(/_/g, ' ');
                      keyRow = keyRow.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                      return (
                        <tr>
                          <th scope="row" className='w-25'>{keyRow}</th>
                          <td className='w-75'>{valueRow}</td>
                        </tr>
                      )

                    })
                }
              
            </tbody>

          </table>

          <div>
           <button className='btn btn-success'
           onClick={handleAddEvidences}>
                {buttonAddEvidences ? 'Cancelar' :'Agregar evidencias'}
           </button>
          </div>
          
          { buttonAddEvidences &&
           <div>
              <div className='mt-5 mb-3'>
                <h3 className='fs-3'>Entrega de evidencias</h3>
              </div>
              
              <div className='row'>
              
                <div className='col-12 col-md-6'>
                  <AddEvidences id_activity={id_activitie} />
                </div>
                
                <div className='col-12 col-md-6'>
    
                  <TableEvidences id_activity={id_activitie} />
    
                </div>
              </div>
            </div>
          }
          
        </div>
    </div>
  )
}
