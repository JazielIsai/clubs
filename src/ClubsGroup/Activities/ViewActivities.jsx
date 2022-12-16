import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';

export const ViewActivities = () => {

    const {club_id} = useParams();
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

    const handleNavigateToActivitie = () => {

    }

    const deleteUser = () => {

    }

    return (
        <div className=''>          
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            {
                                getColumnActivities !== null &&
                                getColumnActivities !== undefined && 
                                    Object.keys(getColumnActivities).map( (keyRow, index) => {
                                        
                                        if (keyRow == 'id') { return null; }

                                        return(
                                            <th key={index} scope="col"> {keyRow} </th>
                                        )
                                    })
                                    
                            }
                            <th scope="col"> Ir a </th>

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
                                        <td>  {activitie?.objetivo_desarrollo_s} </td>
                                        <td>  { activitie?.atributo_egreso }   </td>
                                        <td>  {activitie?.calificacion_valor} </td>
                                        <td>  {activitie?.tipo_evidencia} </td>
                                        <td>  {activitie?.responsable} </td>
                                        <td>  {activitie?.observaciones} </td>
                                        <td>  {activitie?.estatus} </td>
                                        <td>  {activitie?.modelo} </td>

                                        <td>  {activitie?.dominio} </td>
                                        <td>  {activitie?.habilidad} </td>
                                        <td>  {activitie?.tipo_actividad} </td>
                                        <td>  {activitie?.club} </td>
                                        <td>  {activitie?.idioma} </td>


                                        <td>
                                            <button onClick={()=>handleNavigateToActivitie(activitie?.id)} class="btn btn-primary"> Ir a la actividad </button>
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
