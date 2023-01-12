import React, {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {AuthContext} from "../../Auth";
import {requestPost} from "../../helpers";
import {Table} from "../../components/Tables";
import {useDataCollectionRequest} from "../../hooks/useDataCollectionRequest";

export const ViewActivities = () => {

    const { club_id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext); // Get the context

    const { dataCollectionRequest: getActivitiesByClub } = useDataCollectionRequest(
        `get_activities_by_club&club_id=${club_id}`,
        'all',
    );

    const handleNavigateToEditActivity = (e, dataRow) => {
        if ( user.id_club == null ) {
            navigate(`/admin/activities/edit/${club_id}/${dataRow?.id}`)
        } else {
            navigate(`/club/activities/edit/${club_id}/${dataRow?.id}`)
        }

    }

    const handleNavigateToSendEvidences = (e, dataRow) => {
        if (user.id_club == null) {
            navigate(`/admin/activities/evidences/${dataRow?.id}/${dataRow?.nombre}`)
        } else {
            navigate(`/club/activities/evidences/${dataRow?.id}/${dataRow?.nombre}`)
        }
    }

    const handleNavigateEvaluateMembers = (e, dataRow) => {

        const body = {
            id_actividad: parseInt(dataRow?.id),
            id_club: parseInt(club_id)
        }

        console.log(body);

        const formData = new FormData();
        formData.append('evaluation_member_info', JSON.stringify(body));

        requestPost('add_evaluation_member_by_activity', formData)
            .then( (res) => {
                console.log("response -> ",res)
            } )
            .catch( (err) => {
                console.log(err);
            } )

        if (user.id_club == null) {
            navigate(`/admin/activities/evaluate/${dataRow?.id}/${dataRow?.nombre}`)
        } else {
            navigate(`/club/activities/evaluateMember/${club_id}/${dataRow?.id}/${dataRow?.nombre}`)
        }
    }

    return (
        <div className=''>

            <Table
                getColumns={[
                    { headerName: 'id', field: 'id', hidden: true },
                    { headerName: 'Nombre', field: 'nombre' },
                    { headerName: 'Modalidad', field: 'modalidad' },
                    { headerName: 'Tipo evidencia', field: 'tipo_evidencia' },
                    { headerName: 'Responsable', field: 'responsable' },
                    { headerName: 'Estatus', field: 'estatus' },
                    {
                        headerName: 'Entregar evidencias',
                        field: 'entrega_evidencias',
                        type: 'button',
                        label: 'Entregar evidencias',
                        onClick: handleNavigateToSendEvidences,
                        nameClass: 'btn btn-primary',
                    },
                    {
                        headerName: 'Editar Actividad',
                        fiel: 'editar_actividad',
                        type: 'button',
                        label: 'Editar Actividad',
                        onClick: handleNavigateToEditActivity,
                        nameClass: 'btn btn-secondary',
                    },
                    {
                        headerName: 'Evaluar miembros',
                        fiel: 'evaluar_miembros',
                        type: 'button',
                        label: 'Evaluar miembros',
                        onClick: handleNavigateEvaluateMembers,
                        nameClass: 'btn btn-success',
                    }
                ]}
                getRows={getActivitiesByClub || []}
            />


        </div>
    )
}
