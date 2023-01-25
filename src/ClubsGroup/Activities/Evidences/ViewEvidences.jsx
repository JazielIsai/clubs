import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../../../Auth";
import {useFetch_RequestGet} from "../../../hooks/useFetchGet";
import {useForm} from "../../../hooks/useForm";
import {Table} from "../../../components/Tables";
import {useDataCollectionRequest} from "../../../hooks/useDataCollectionRequest";

export const ViewEvidences = () => {

    const { club_id } = useParams();

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();


    const { dataCollectionRequest : getActivity } = useDataCollectionRequest(
        `get_activities_by_club&club_id=${club_id}`,
        'all'
    )

    const { dataForm, onInputChange, onResetForm } = useForm({});


    const handleNavigateEvidenceByActivity = (e, activity) => {
        if (user.id_club != null) {
            navigate(`/club/activities/view_evidencie_by_activity/${activity?.id}/${activity?.nombre}`);
        } else {
            navigate(`/admin/activities/view_evidencie_by_activity/${activity?.id}/${activity?.nombre}`);
        }

    }

    return (
        <div className='container'>
            <Table
                getColumns={[
                    { headerName: 'id', field: 'id', hidden: true },
                    { headerName: 'Nombre', field: 'nombre' },
                    { headerName: 'Estatus', field: 'estatus' },
                    { headerName: 'Tipo de evidencia', field: 'tipo_evidencia' },
                    {
                        headerName: 'Evidencias',
                        field: 'evidencias',
                        type: 'button',
                        label: 'Ver evidencias',
                        nameClass: 'btn btn-primary',
                        onClick: handleNavigateEvidenceByActivity
                    }

                ]}
                getRows={getActivity || []}
            />

        </div>
  )
}
