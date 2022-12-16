import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet'

export const TableClub = () => {

    const { data } = useFetch_RequestGet('get_all_clubes');

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

    const handleNavigateToClub = (id) => {
        navigate(`/admin/viewClubs/${id}`)
    }

    return (
        <div class="table-responsive">
            <table class="table">

                <thead>
                    <tr>
                    {
                        getColumnClubs !== null &&
                        getColumnClubs !== undefined && 
                            Object.keys(getColumnClubs).map( (keyRow, index) => {
                                
                                if (keyRow === "id_club") { return null; }

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
                                <td> { club?.nombre } </td>
                                <td> {club?.objetivo} </td>
                                <td>  {club?.plantel} </td>
                                <td>  {club?.categoria} </td>
                                <td>  {club?.especialidad} </td>
                                <td>  {club?.logo} </td>
                                <td>  {club?.fecha_creacion} </td>
                                <td>  {club?.plan_anual} </td>
                                <td>  {club?.acta_constitutiva} </td>

                                <td>
                                    <button onClick={()=>handleNavigateToClub(club?.id_club)} class="btn btn-primary"> Ir al Club </button>
                                </td>

                            </tr>
                        ))
                }
                </tbody>


            </table>
        </div>
    )
}