import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet'

export const TableClub = () => {

    const { data } = useFetch_RequestGet('get_all_clubs');

    const navigate = useNavigate();

    const [ getRowClubs, setRowClubs ] = useState();
    const [getColumnClubs, setColumnClubs] = useState();

    useEffect ( () => {
        try {
            console.log(JSON.parse(data)[0]);
            setRowClubs(JSON.parse(data));
            setColumnClubs(JSON.parse(data)[0]);
        } catch (err ) {

        }

    }, [data] )

    const handleNavigateToClub = (id, club_name) => {
        navigate(`/admin/viewClubs/${id}/${club_name}`);
    }

    return (
        <div class="table-responsive">
            <table class="table table-hover">

                <thead>
                    <tr>
                    {
                        getColumnClubs !== null &&
                        getColumnClubs !== undefined && 
                            Object.keys(getColumnClubs).map( (keyRow, index) => {
                                
                                if (keyRow == 'id') { return null; }
                                if (keyRow == 'fecha_creacion') { return null; }
                                if (keyRow == 'plantel') { return null; }

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
                        getRowClubs !== null &&
                        getRowClubs !== undefined && 
                            getRowClubs.map( (club, index) => (
                                <tr key={index}>

                                    {/* <th scope="row"> {club?.id_club} </th> */}
                                    <td> { club?.name } </td>
                                    <td> {club?.objetivo} </td>
                                    {/* <td>  {club?.fecha_creacion} </td> */}
                                    <td>  { club?.estatus }   </td>
                                    {/* <td>  {club?.plantel} </td> */}
                                    <td>  {club?.categoria_club} </td>
                                    <td>  {club?.especialidad_club} </td>


                                    <td>
                                        <button onClick={()=>handleNavigateToClub(club?.id, club?.name)} className="btn btn-primary"> Ir al Club </button>
                                    </td>

                                </tr>
                            ))
                    }
                </tbody>


            </table>
        </div>
    )
}
