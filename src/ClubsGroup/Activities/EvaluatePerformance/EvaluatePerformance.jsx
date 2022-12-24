import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import {AuthContext} from "../../Auth";


export const EvaluatePerformance = () => {

    const { club_id, id_activity } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext); // Get the context

    const { data: membersByClub } = useFetch_RequestGet(`get_users_by_club&club_id=${club_id}`);

    const [ getRowMembers, setRowMembers ] = useState();

    useEffect( ( ) => {
        try {
            setRowMembers(JSON.parse(membersByClub));
        } catch (err ) {

        }
    } , [membersByClub] );


    return (
        <div className='container'>
            <h4 className='fs-4' > Evaluar el desempeño de cada alumno </h4>

            <div className="table-responsive">
                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            getRowMembers !== undefined &&
                            getRowMembers !== null &&
                                getRowMembers.map( (row, index) => {
                                    return (
                                        <tr>
                                            <td>{row.nombre}</td>
                                            <td>{row.apellido_paterno}</td>
                                        </tr>
                                    )
                                } )
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )

}
