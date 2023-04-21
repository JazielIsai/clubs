import React, { useEffect, useState } from 'react'
import { useFetch_RequestGet } from '../../../../hooks/useFetchGet';
import {AlertError, AlertSuccess, confirmDialog, requestPost} from "../../../../helpers";
import {useForm} from "../../../../hooks/useForm";

export const Especialidad = () => {


    const { data } = useFetch_RequestGet('get_all_specialties');

    const [ getRow, setRow ] = useState();
    const [getColumn, setColumn] = useState();
    const [disableEdit, setDisableEdit] = useState(true);


    const { dataForm, onInputChange, onResetForm } = useForm({});

    useEffect( () => {
        try {
            setColumn(JSON.parse(data)[0]);
            setRow(JSON.parse(data));
        } catch (err ) {
            console.log(err);
        }

    },[data])

    const handleEdit = (id) => {
        if (dataForm.name == '' || dataForm.name == null || dataForm.name == undefined) {
            AlertError('Error', 'Todos los campos son obligatorios');
            throw new Error('Todos los campos son obligatorios');
        }

        const body = {
            nombre: dataForm.name,
            id: id
        }

        const formData = new FormData();
        formData.append('specialty_info', JSON.stringify(body));

        requestPost('update_specialty', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Exito', 'Categoria actualizada con exito');
                    setRow([...getRow, {id: parseInt(response), nombre: dataForm.name}]);
                } else {
                    AlertError('Error', 'Ocurrio un error al actualizar la categoria');
                }
            } );

    }

    const handleDelete = (id) => {

        confirmDialog('¿Estas seguro de eliminar esta categoria?', 'Esta accion no se puede deshacer', 'warning', 'Si, eliminar', 'Cancelar')
            .then( result => {
                if (result.isConfirmed) {

                    const formData = new FormData();
                    formData.append('id_specialty', id);

                    requestPost('delete_specialty', formData)
                        .then( response => {
                            console.log(response);
                            if ( !(response.includes('Error: missing info.')) ) {
                                AlertSuccess('Exito', 'Categoria eliminada con exito');
                                setRow(getRow.filter( item => item.id !== id ));
                            } else {
                                AlertError('Error', 'Ocurrio un error al eliminar la categoria');
                            }
                        } );
                }
            } )

    }

    const handleEnableEdit = () => {
        setDisableEdit(!disableEdit);

    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (dataForm.name == '' || dataForm.name == null || dataForm.name == undefined) {
            AlertError('Error', 'Todos los campos son obligatorios');
            throw new Error('Todos los campos son obligatorios');
        }

        const body = {
            nombre: dataForm.name
        }

        const formData = new FormData();

        formData.append('especialidad_info', JSON.stringify(body));

        requestPost('add_new_specialty', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Exito', 'Categoria registrada con exito');
                    setRow([...getRow, {id: parseInt(response), nombre: dataForm.name}]);
                } else {
                    AlertError('Error', 'Ocurrio un error al registrar la categoria');
                }
            } );

    }

  return (
    <div className='container'>
        <h3> Especialidades / Carreras </h3>
        <div className='row'>
            <div className='col-12 col-md-6'>
                <h5> Registrar </h5>
                <form>
                    <div className='form-group'>
                        <label htmlFor='name'> Nombre </label>
                        <input type='text' className='form-control' id='name' name={'name'} onChange={onInputChange} />
                    </div>
                    <div className='d-flex mt-3 justify-content-end'>
                        <button type='submit' className='btn btn-success' onClick={onSubmit}> Guardar </button>
                    </div>
                </form>
            </div>
            <div className='col-12 col-md-6' style={{maxHeight: '65vh'}}>
                <div className={'d-flex flex-row justify-content-between'}>
                    <h5> Ver Tabla </h5>
                    <button className={'btn btn-primary'} onClick={handleEnableEdit}> Editar </button>
                </div>
                <div className='table-responsive'  style={{height: '90%'}}>
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
                                                <input type={'text'} className={'form-control'} disabled={disableEdit} defaultValue={ activitie?.nombre } />
                                            </td>

                                            <td>
                                                <button onClick={()=>handleEdit(activitie?.id)} disabled={disableEdit} className="btn btn-success"> Actualizar </button>
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
