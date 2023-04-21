import React, { useEffect, useState } from 'react'
import { confirmDialog } from '../../../../helpers/Alerts/AlertConfirmDialog';
import { AlertError } from '../../../../helpers/Alerts/AlertError';
import { AlertSuccess } from '../../../../helpers/Alerts/AlertSuccess';
import { requestPost } from '../../../../helpers/requestPost';
import { useFetch_RequestGet } from '../../../../hooks/useFetchGet';
import { useForm } from '../../../../hooks/useForm';

export const RolMember = () => {


    const { data } = useFetch_RequestGet('get_all_rol_members_clubs');

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const [ getRow, setRow ] = useState();
    const [getColumn, setColumn] = useState();
    const [disableEdit, setDisableEdit] = useState(true);

    useEffect( () => {

        try {
            console.log(JSON.parse(data)[0]);
            setColumn(JSON.parse(data)[0]);
            setRow(JSON.parse(data));
        } catch (err ) {
            console.log(err);
        }

    },[data])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (dataForm.nameRolMember == '' || dataForm.nameRolMember == null || dataForm.nameRolMember == undefined) {
            AlertError('Error', 'Todos los campos son obligatorios');
            throw new Error('Todos los campos son obligatorios');
        }

        const formData = new FormData();
        formData.append('name_rol_to_member', dataForm.nameRolMember);

        requestPost('add_rol_member_club', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Exito', 'Categoria registrada con exito');
                    setRow([...getRow, {id: parseInt(response), nombre: dataForm.nameRolMember}]);
                    onResetForm();
                } else {
                    AlertError('Error', 'Ocurrio un error al registrar la categoria');
                }
            });

    }

    const handleDisabledEdit = () => {
        setDisableEdit(!disableEdit);
    }

    const handleEdit = (id, name) => {

        const formData = new FormData();
        formData.append('name_rol_member_club', name);
        formData.append('id_rol_member_club', id);

        requestPost('update_name_rol_member_club', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Exito', 'Categoria actualizada con exito');
                } else {
                    AlertError('Error', 'Ocurrio un error al actualizar la categoria');
                }
            } );

    }

    const handleDelete = (id) => {

        confirmDialog('¿Eliminar?','¿Estas seguro de eliminar esta categoria?', 'Eliminar', 'Cancelar')
            .then( response => {
                if (response) {

                    const formData = new FormData();
                    formData.append('id_rol_member_club', id);
                    requestPost('delete_rol_member_club', formData)
                        .then( response => {
                            console.log(response);
                            if ( !(response.includes('Error: missing info.')) ) {
                                AlertSuccess('Exito', 'Categoria eliminada con exito');
                                setRow(getRow.filter( row => row.id != id));
                            } else {
                                AlertError('Error', 'Ocurrio un error al eliminar la categoria');
                            }
                        } );

                } else {
                    return;
                }
            } )


    }

  return (
    <div className='container'>
        <h3> Roles </h3>
        <div className='row'>
            <div className='col-12 col-md-6'>
                <h5> Registrar </h5>
                <form>
                        <div className='form-floating mb-3'>
                            <input type='text' onChange={onInputChange} name='nameRolMember' className='form-control' id='floatingname' />
                            <label htmlFor='floatingname'> Nombre </label>
                        </div>

                        <div className='d-flex mt-3 justify-content-end'>
                            <button type='button' onClick={handleSubmit} className='btn btn-success'> Guardar </button>
                        </div>

                </form>
            </div>
            <div className='col-12 col-md-6' style={{maxHeight: '65vh'}}>
                <div className={'d-flex flex-row justify-content-between'}>
                    <h5> Ver Tabla </h5>
                    <button onClick={()=>handleDisabledEdit(disableEdit)} className="btn btn-primary"> Editar </button>
                </div>
                <div className='table-responsive' style={{height: '90%'}}>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {
                                    getColumn !== null &&
                                    getColumn !== undefined && 
                                        Object.keys(getColumn).map( (keyRow, index) => {
                                            
                                            if (keyRow == 'id') { return null; }

                                            keyRow = keyRow.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                                            return(
                                                <th key={index} scope="col"> {keyRow} </th>
                                            )
                                        })
                                        
                                }
                                <th scope="col"> Actualizar </th>
                                <th scope="col"> Eliminar </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                getRow !== null &&
                                getRow !== undefined &&
                                    getRow.map( (activitie, index) => (
                                        <tr key={index}>

                                            {/* <th scope="row"> {club?.id_club} </th> */}
                                            <td>
                                                <input type={'text'} defaultValue={activitie?.nombre} disabled={disableEdit} id={activitie.id} className={'form-control'} />
                                            </td>

                                            <td>
                                                <button onClick={()=>{handleEdit(activitie?.id,activitie?.nombre)}} disabled={disableEdit} className="btn btn-success"> Actualizar </button>
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
        </div>
    </div>
  )
}


