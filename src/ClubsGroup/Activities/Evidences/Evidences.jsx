import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import { ViewEvidences } from './ViewEvidences';
import { AddEvidences } from './AddEvidences';

export const Evidences = () => {

  const navigate = useNavigate();
  const { id_activitie, nameActivitie } = useParams();
  
  const { data: activitiesById } = useFetch_RequestGet(`get_activities_by_id&activities_id=${id_activitie}`);
  const {data: evidencesByActivitie} = useFetch_RequestGet(`get_evidences_by_activity&id_activity=${id_activitie}`)

  const [ getDataActivities, setDataActivities ] = useState();
  const [ getDataEvidences, setDataEvidences ] = useState();
  const [ getColumnEvidences, setColumnEvidences ] = useState();

  const handleGoAddEvidence = () => {
    navigate('/admin/evidences/add')
  }

  useEffect( () => {
    try {

      console.log(JSON.parse(evidencesByActivitie)[0]);
      setDataActivities(JSON.parse(activitiesById)[0]);
      setColumnEvidences(JSON.parse(evidencesByActivitie)[0]);
      setDataEvidences(JSON.parse(evidencesByActivitie));


    } catch (err) {
      console.log(err);
    }
  }, [activitiesById, evidencesByActivitie] )

  const handleNavigateToEditEvidence = (id_activitie) => {
    navigate(`/admin/evidences/edit/${id_activitie}`)
  }

  return (
    <div className='container'>
        
        <div className='d-flex flex-column'>
          <h3 className='fs-3 mt-3'> 
            {nameActivitie}
            {}
          </h3>

          <table className='table caption-top'>
            <caption>{nameActivitie}</caption>
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

          <div className='mt-5 mb-3'>
            <h3 className='fs-3'>Entrega de evidencias</h3>
          </div>
          
          <div className='row'>
          
            <div className='col-12 col-md-6'>
              
              <AddEvidences />

            </div>
            <div className='col-12 col-md-6'>
                <table className='table caption-top'>
                  <caption> Evidencias entregadas </caption>
                  <thead>
                    <tr>
                      {
                        getColumnEvidences !== undefined &&
                        getColumnEvidences !== null &&
                          Object.keys(getColumnEvidences).map( (keyRow, index) => {
                            if (keyRow == 'id') { return null; }
                            if (keyRow == 'id_actividad') { return null; }

                            keyRow = keyRow.replace(/_/g, ' ');
                            keyRow = keyRow.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                            return (
                              <th key={index} scope="col"> {keyRow} </th>
                            )
                          })
                      }

                      <th scope="col"> Editar </th>
                      <th scope="col"> Eliminar </th>

                    </tr>
                  </thead>
                  <tbody>
                      {
                        getDataEvidences !== undefined &&
                        getDataEvidences !== null &&
                          getDataEvidences.map(  (valueRow, index) => {
     
                            return (
                              <tr key={index} >
                                <td>{valueRow?.nombre}</td>
                                <td>{valueRow?.tipo}</td>
                                <td>{valueRow?.ruta}</td>
                                <td>
                                  <button className='btn btn-primary' >Editar</button>
                                </td>
                                <td>
                                  <button className='btn btn-danger'>Eliminar</button>
                                </td>
                              </tr>
                            )

                          })
                      }

                  </tbody>
                </table>

            </div>
          
          </div>
              {/* <ViewEvidences /> */}
        </div>
    </div>
  )
}
