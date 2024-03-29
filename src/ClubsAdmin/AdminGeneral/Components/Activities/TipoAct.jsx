import React, { useEffect, useState } from 'react'
import { useFetch_RequestGet } from '../../../../hooks/useFetchGet';
import {AlertError, AlertSuccess, requestPost} from "../../../../helpers";
import {useForm} from "../../../../hooks/useForm";

export const TipoAct = () => {

    const { data } = useFetch_RequestGet('get_all_type_activity');

    const {dataForm, onInputChange, onResetForm } = useForm({});

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

        if (dataForm.typeAct == '' || dataForm.typeAct == null || dataForm.typeAct == undefined) {
            AlertError('Error', 'Todos los campos son obligatorios');
            throw new Error('Todos los campos son obligatorios');
        }

        const formData = new FormData();
        formData.append('name_type_activity', dataForm.typeAct);

        requestPost('add_type_activity', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Exito', 'Categoria registrada con exito');
                    setRow([...getRow, {id: parseInt(response), nombre: dataForm.typeAct}]);
                } else {
                    AlertError('Error', 'Ocurrio un error al registrar la categoria');
                }
            });
    }


    const handleEdit = (id) => {

        if (dataForm.name == '' || dataForm.name == null || dataForm.name == undefined) {
            AlertError('Error', 'Todos los campos son obligatorios');
            throw new Error('Todos los campos son obligatorios');
        }

        const body = {
            id: id,
            nombre: dataForm.name
        }

        const formData = new FormData();
        formData.append('activity_info', JSON.stringify(body));

        requestPost('update_type_activity', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Exito', 'Categoria registrada con exito');
                } else {
                    AlertError('Error', 'Ocurrio un error al registrar la categoria');
                }
            });

    }

    const handleDelete = (id) => {

        const formData = new FormData();
        formData.append('id_type_activity', id);

        requestPost('delete_type_activity', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Éxito', 'El tipo de actividad fue eliminada con éxito');
                    setRow(getRow.filter( activitie => activitie.id !== id ));
                } else {
                    AlertError('Error', 'Ocurrió un error al eliminar');
                }
            });


    }

    return (
        <div className='container'>
            <h3> Tipo de actividad </h3>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <h5> Registrar </h5>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'> Nombre </label>
                            <input type='text' className='form-control' id='name' name={'typeAct'} onChange={onInputChange} />
                        </div>
                        <div className='d-flex mt-3 justify-content-end'>
                            <button type='submit' className='btn btn-success' onClick={handleSubmit} > Guardar </button>
                        </div>
                    </form>
                </div>
                <div className='col-12 col-md-6' style={{maxHeight: '65vh'}}>

                    <div className={'d-flex flex-row justify-content-between'}>
                        <h5> Ver Tabla </h5>
                        <button className={'btn btn-primary'} onClick={()=>setDisableEdit(!disableEdit)} > Editar </button>
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
                                    <th scope="col"> Ir a </th>
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
                                                    <input type={'text'} className={'form-control'} disabled={disableEdit} defaultValue={ activitie?.nombre } onChange={onInputChange} name={'name'}  />
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
