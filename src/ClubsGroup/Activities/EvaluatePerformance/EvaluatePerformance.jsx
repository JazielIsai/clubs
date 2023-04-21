import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import {AlertToast, requestPost} from "../../../helpers";
import {AuthContext} from "../../../Auth";
import {useForm} from "../../../hooks/useForm";


export const EvaluatePerformance = () => {

    const { club_id, idActivity, nameActivity } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext); // Get the context

    const { data: evaluationMembers } = useFetch_RequestGet(`get_evaluation_member&id_activity=${idActivity}`);

    const [ getRowMembers, setRowMembers ] = useState(null);

    const { dataForm, onInputChange, onResetForm } = useForm({});

    useEffect( ( ) => {
        try {
            console.log( evaluationMembers );
            setRowMembers( JSON.parse(evaluationMembers) );
        } catch (err ) {

        }
    } , [evaluationMembers] );

    const handleSaveEvaluationByMember = ( data, form ) => {



        const body = {
            observaciones: form.observaciones,
            hab_desarrollada: form.hab_desarrollada,
            competencia_conocer: form.competencia_conocer,
            calificacion: form.calificacion,
            id: data.id
        }

        console.log("this is the body to send request", body);

        const formData = new FormData();
        formData.append('evaluation_member_info', JSON.stringify(body));

        requestPost('_evaluation_member_by_activity', formData)
            .then( (res) => {
                console.log(res);
                if ( res.includes('1') ) {
                    AlertToast("Se ha guardado la evaluación correctamente", "success", 3000);
                } else {
                    AlertToast("Ha ocurrido un error al guardar la evaluación", "error", 3000);
                }
            } )
            .catch( (err) => {
                console.log(err);
            } )

    }


    return (
        <div className='container'>
            <h3 className='fs-3 text-center'> {nameActivity} </h3>
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
                                        <tr key={index} >
                                            <td>{row.nombre_miembro}</td>
                                            <td> <input type='text' defaultValue={ row?.observaciones } name='observaciones' onChange={onInputChange} className='form-control' /> </td>
                                            <td> <input type='text' defaultValue={ row?.hab_desarrollada } name='hab_desarrollada' onChange={onInputChange} className='form-control' /> </td>
                                            <td> <input type='text' defaultValue={ row?.competencia_conocer } name='competencia_conocer' onChange={onInputChange} className='form-control' /> </td>
                                            <td> <input type='text' defaultValue={ row?.calificacion } name='calificacion' onChange={onInputChange} className='form-control' /> </td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={()=>handleSaveEvaluationByMember(row, dataForm)}
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
