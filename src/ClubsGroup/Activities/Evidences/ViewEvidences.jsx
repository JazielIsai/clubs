import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../../../Auth";
import {useFetch_RequestGet} from "../../../hooks/useFetchGet";
import {useForm} from "../../../hooks/useForm";

export const ViewEvidences = () => {

    const { club_id } = useParams();

    const navigate = useNavigate();

    const { data: getActivity } = useFetch_RequestGet(`get_activities_by_club&club_id=${club_id}`);

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const [ getRowActivities, setRowActivities ] = useState();
    const [getColumnActivities, setColumnActivities] = useState();

    useEffect( () => {

        try {
            console.log(JSON.parse(getActivity)[0]);
            setColumnActivities(JSON.parse(getActivity)[0]);
            setRowActivities(JSON.parse(getActivity));
        } catch (err) {
            console.log(err);
        }

    }, [getActivity] )

    const handleNavigateEvidenceByActivity = (activity) => {

        navigate(`/club/activities/evidences/${activity?.id}/${activity?.nombre}`);

    }

    return (
        <div className='container'>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            {
                                getColumnActivities &&
                                Object.keys(getColumnActivities).map( (key, index) => {

                                    if (key == 'nombre' || key == 'estatus' || key == 'tipo_evidencia' ) {

                                        // Replace the underscore with a space
                                        key = key.replace(/_/g, ' ');
                                        // Capitalize the first letter of each word
                                        key = key.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                                        return (
                                            <th key={index}>{key}</th>
                                        )
                                    } else {
                                        return null;
                                    }

                                } )
                            }

                            <th> Ir a evidencia(s) </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            getRowActivities &&
                            getRowActivities.map( (row, index) => {
                                return (
                                    <tr key={index}>
                                        {
                                            Object.keys(row).map( (key, index) => {

                                                if (key === 'nombre' || key === 'estatus' || key === 'tipo_evidencia' ) {
                                                    return (
                                                        <td key={index}>{row[key]}</td>
                                                    )
                                                } else {
                                                    return null;
                                                }
                                            } )

                                        }

                                        <td>
                                            <button className='btn btn-primary' onClick={()=>handleNavigateEvidenceByActivity(row)} > Ver Evidencia(s) </button>
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
