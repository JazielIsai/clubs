import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch_RequestGet } from '../../hooks/useFetchGet'

export const ViewMembers = () => {

    const { club_id } = useParams();

    const {data} = useFetch_RequestGet('get_users_by_club&club_id='+club_id)
    
    const [ getRowMembers, setRowMembers ] = useState();
    const [getColumnMembers, setColumnMembers] = useState();

    useEffect( () => {

        try {
            setColumnMembers(JSON.parse(data)[0]);
            setRowMembers(JSON.parse(data));
        } catch (err ) {
            console.log(err);
        }
        
    }, [data] )

    const handleNavigateToMember = (id_activitie) => {

    }

    const handleDelete = (id_activitie) => {

    }

    return (
        <div className=''>          
            <div class="table-responsive table-hover">
            <table class="table">
                    <thead>
                        <tr>
                            {
                                getColumnMembers !== null &&
                                getColumnMembers !== undefined && 
                                    Object.keys(getColumnMembers).map( (keyRow, index) => {
                                        
                                        if (keyRow == 'id') { return null; }
                                        if (keyRow == 'no_control') {
                                            keyRow = 'No. Control';
                                        }
                                        if (keyRow == 'apellido_paterno') { 
                                            keyRow = 'Apellido Paterno';
                                        }
                                        if (keyRow == 'apellido_materno') {
                                            keyRow = 'Apellido Materno';
                                        }
                                        if (keyRow == 'especialidad_miembro') { return null; }
                                        if (keyRow == 'nombre_club') { return null; }

                                        keyRow = keyRow.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

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
                            getRowMembers !== null &&
                            getRowMembers !== undefined && 
                                getRowMembers.map( (activitie, index) => (
                                    <tr key={index}>

                                        {/* <th scope="row"> {club?.id_club} </th> */}
                                        <td> {activitie?.no_control} </td>
                                        <td> { activitie?.nombre } </td>
                                        <td>  {activitie?.apellido_paterno} </td>
                                        <td>  { activitie?.apellido_materno }   </td>
                                        <td>  {activitie?.sexo} </td>
                                        <td>  {activitie?.correo} </td>
                                        <td>  {activitie?.telefono} </td>
                                        <td>  {activitie?.rango} </td>
                                        <td>  {activitie?.semestre} </td>
                                        {/* <td>  {activitie?.especialidad_miembro} </td> */}

                                        <td>  {activitie?.rol_miembro} </td>
                                        {/* <td>  {activitie?.nombre_club} </td> */}

                                        <td>
                                            <button onClick={()=>handleNavigateToMember(activitie?.id)} class="btn btn-primary"> Editar </button>
                                        </td>
                                        <td>
                                            <button onClick={()=>handleDelete(activitie?.id)} className="btn btn-danger"> Eliminar </button>
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
