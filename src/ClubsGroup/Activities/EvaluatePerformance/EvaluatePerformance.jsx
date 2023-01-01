import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import {AuthContext} from "../../../Auth";


export const EvaluatePerformance = () => {

    const { club_id, idActivity, nameActivity } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext); // Get the context

    const { data: evaluationMembers } = useFetch_RequestGet(`get_evaluation_member&id_activity=${idActivity}`);

    const [ getRowMembers, setRowMembers ] = useState(null);

    useEffect( ( ) => {
        try {
            console.log( evaluationMembers );
            setRowMembers( JSON.parse(evaluationMembers) );
        } catch (err ) {

        }
    } , [evaluationMembers] );

    const handleSaveEvaluationByMember = ( data ) => {

    }


    return (
        <div className='container'>
            <h3> {nameActivity} </h3>
            <h4 className='fs-4' > Evaluar el desempeño de cada alumno </h4>

            <div className="table-responsive">
                <table className="table table-hover">

                    <thead>
                        <tr>
                            {
                                getRowMembers !== null &&
                                getRowMembers !== undefined &&
                                    Object.keys(getRowMembers[0]).map( (keyRow, index) => {
                                        if (keyRow == 'id' || keyRow == 'id_miembro' || keyRow == 'id_actividad' ) { return null; }
                                        if (keyRow == 'nombre_miembro') { keyRow = 'Nombre del Miembro'; }
                                        if (keyRow == 'hab_desarrollada') { keyRow = 'Habilidad desarrollada'; }
                                        if (keyRow == 'competencia_conocer') { keyRow = 'Competencia a conocer'; }
                                        if (keyRow == 'nombre_actividad') { return null; }

                                        return <th key={index}> {keyRow} </th>
                                    } )
                            }
                            <th > Guardar  </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            getRowMembers !== undefined &&
                            getRowMembers !== null &&
                                getRowMembers.map( (row, index) => {
                                    return (
                                        <tr>
                                            <td>{row.nombre_miembro}</td>
                                            <td> <input type='text' defaultValue={ row?.observaciones } name='observaciones' className='form-control' /> </td>
                                            <td> <input type='text' defaultValue={ row?.hab_desarrollada } name='observaciones' className='form-control' /> </td>
                                            <td> <input type='text' defaultValue={ row?.competencia_conocer } name='observaciones' className='form-control' /> </td>
                                            <td> <input type='text' defaultValue={ row?.calificacion } name='observaciones' className='form-control' /> </td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={()=>handleSaveEvaluationByMember(row)}
                                                >
                                                    Guardar
                                                </button>
                                            </td>
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
