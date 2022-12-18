import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';

export const ViewActivities = () => {

    const { club_id } = useParams();
    const navigate = useNavigate();
    

    const { data: activitiesByClub } = useFetch_RequestGet(`get_activities_by_club&club_id=${club_id}`);

    const [ getRowActivities, setRowActivities ] = useState();
    const [getColumnActivities, setColumnActivities] = useState();

    useEffect( ( ) => {
        try {
            console.log(JSON.parse(activitiesByClub)[0]);
            setColumnActivities(JSON.parse(activitiesByClub)[0]);
            setRowActivities(JSON.parse(activitiesByClub));
        } catch (err ) {

        }
    }, [activitiesByClub] )

    const handleNavigateToEditActivitie = (id_activitie) => {
        navigate(`/admin/activities/edit/${club_id}/${id_activitie}`)
    }

    const handleNavigateToSendEvidences = (id_activitie) => {
        navigate(`/admin/activities/send_evidences/${club_id}/${id_activitie}`)
    }


    const deleteUser = () => {
        console.log('delete user');
    }

    return (
        <div className=''>          
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {
                                getColumnActivities !== null &&
                                getColumnActivities !== undefined && 
                                    Object.keys(getColumnActivities).map( (keyRow, index) => {

                                        if (keyRow == 'id') { return null; }
                                        if (keyRow == 'objetivo_desarrollo_s') { return null; }
                                        if (keyRow == 'atributo_egreso') { return null; }
                                        if (keyRow == 'observaciones') { return null; }
                                        if (keyRow == 'modelo') { return null; }
                                        if (keyRow == 'dominio') { return null; }
                                        if (keyRow == 'habilidad') { return null; }
                                        if (keyRow == 'idioma') { return null; }
                                        if (keyRow == 'club') { return null; }
                                        if (keyRow == 'calificacion_valor') { 
                                            keyRow = 'Calificación';
                                         }
                                        if (keyRow == 'tipo_evidencia') {
                                            keyRow = 'Tipo de evidencia';
                                        }
                                        if (keyRow == 'tipo_actividad') {
                                            keyRow = 'Tipo de actividad';
                                        }

                                        keyRow = keyRow.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                                        return(
                                            <th key={index} scope="col"> {keyRow} </th>
                                        )
                                    })
                                    
                            }

                            <th scope="col"> Ir a </th>
                            <th scope="col"> Editar </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            getRowActivities !== null &&
                            getRowActivities !== undefined && 
                                getRowActivities.map( (activitie, index) => (
                                    <tr key={index}>

                                        {/* <th scope="row"> {club?.id_club} </th> */}
                                        <td> { activitie?.nombre } </td>
                                        <td> {activitie?.modalidad} </td>
                                        {/* <td>  {activitie?.objetivo_desarrollo_s} </td> */}
                                        {/* <td>  { activitie?.atributo_egreso }   </td> */}
                                        <td>  {activitie?.calificacion_valor} </td>
                                        <td>  {activitie?.tipo_evidencia} </td>
                                        <td>  {activitie?.responsable} </td>
                                        {/* <td>  {activitie?.observaciones} </td> */}
                                        <td>  {activitie?.estatus} </td>
                                        {/* <td>  {activitie?.modelo} </td> */}

                                        {/* <td>  {activitie?.dominio} </td> */}
                                        {/* <td>  {activitie?.habilidad} </td> */}
                                        <td>  {activitie?.tipo_actividad} </td>
                                        {/* <td>  {activitie?.club} </td> */}
                                        {/* <td>  {activitie?.idioma} </td> */}


                                        <td>
                                            <button onClick={()=>handleNavigateToEditActivitie(activitie?.id)} class="btn btn-info"> Ir a la actividad </button>
                                        </td>

                                        <td>
                                            <button onClick={()=>handleNavigateToSendEvidences(activitie?.id)} class="btn btn-primary"> Editar </button>
                                        </td>

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
