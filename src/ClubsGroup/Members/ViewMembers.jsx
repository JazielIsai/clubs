import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {AuthContext} from "../../Auth";
import {TableEdit} from "../../components/Tables";
import {useDataCollectionRequest} from "../../hooks/useDataCollectionRequest";
import {AlertDialog, AlertError, AlertSuccess, AlertToast, requestPost} from "../../helpers";

export const ViewMembers = () => {

    const { club_id } = useParams();

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { dataCollectionRequest: getUsers  } = useDataCollectionRequest(
        'get_users_by_club&club_id='+club_id,
        'all',
    );

    const { dataCollectionRequest: getRoles, setDataCollectionRequest  } = useDataCollectionRequest(
        'get_all_rol_members_clubs',
        'all',
    );

    const handleNavigateToMember = (e, dataRow) => {
        console.log(dataRow);
        if ( user?.id_club == null ) {
            navigate(`/admin/members/edit/${club_id}/${dataRow.id}`);
        } else {
            navigate(`/club/members/edit/${club_id}/${dataRow.id}`);
        }

    }

    const handleUpdateRolMember = (e, dataRow) => {
        console.log(dataRow);

        const body = {
            id_rol_member_club: parseInt(e.target.value),
            id: parseInt(dataRow?.id),
        }

        console.log("body ->", body);

        const formData = new FormData();
        formData.append('member_info', JSON.stringify(body));

        requestPost('update_rol_member_club', formData)
            .then( (response) => {
                console.log(response.trim());
                if (response.trim() == '1') {
                    AlertToast('Rol actualizado correctamente','success',3000);
                } else {
                    AlertError('Error', 'No se pudo actualizar el rol del miembro');
                }
            } )
            .catch( (error) => {
                console.log(error);
            } );

    }

    const handleDelete = (e, dataRow) => {
        if ( user?.id_club == null ) {

        } else {

        }

        AlertDialog(`Eliminar`, `¿Deseas eliminar a ${dataRow?.nombre_completo}?`, 'Eliminar', 'Canelar')
            .then( res => {
                if (res) {
                    console.log('el', res)
                    const formData = new FormData();
                    formData.append('id_member', dataRow?.id);

                    requestPost('delete_member', formData)
                        .then( (response) => {

                        } )
                        .catch( (err) => {
                            console.log(err);
                        } )
                }
            })

    }

    return (
        <div className=''>

            <TableEdit
                getColumns={[
                    {headerName: 'ID', field: 'id', hidden: true},
                    {headerName: 'No. Control', field: 'no_control'},
                    {headerName: 'Nombre', field: 'nombre_completo'},
                    {
                        headerName: 'Rol',
                        field: 'id_rol_member_club',
                        type: 'select',
                        options: getRoles && getRoles.map ( (rol) => {
                            return { value: rol.id, label: rol.nombre }
                        } ),
                        onChange: handleUpdateRolMember,

                    },
                    {headerName: 'Correo', field: 'correo'},
                    {headerName: 'Telefono', field: 'telefono'},
                    {headerName: 'Especialidad', field: 'especialidad_miembro'},
                    {
                        headerName: 'Editar',
                        field: 'editar',
                        type: 'button',
                        onClick: handleNavigateToMember,
                        nameClass: 'btn btn-primary',
                        label: 'Editar'
                    },
                    {
                        headerName: 'Eliminar',
                        field: 'eliminar',
                        type: 'button',
                        onClick: handleDelete,
                        nameClass: 'btn btn-danger',
                        label: 'Eliminar'
                    }

                ]}
                getRows={getUsers && getRoles ? getUsers : []}
            />

        </div>
    )
}
