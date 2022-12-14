import React, { useEffect, useState } from 'react'
import { useFetch_RequestGet } from '../../../../hooks/useFetchGet';

export const Especialidad = () => {


    const { data } = useFetch_RequestGet('get_all_speciality');

    const [ getRow, setRow ] = useState();
    const [getColumn, setColumn] = useState();

    useEffect( () => {

        try {
            console.log(JSON.parse(data)[0]);
            setColumn(JSON.parse(data)[0]);
            setRow(JSON.parse(data));
        } catch (err ) {
            console.log(err);
        }

    },[data])

    const handleEdit = (id) => {
        
    }

    const handleDelete = (id) => {

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
                        <input type='text' className='form-control' id='name' />
                    </div>
                    <div className='d-flex mt-3 justify-content-end'>
                        <button type='submit' className='btn btn-success'> Guardar </button>
                    </div>
                </form>
            </div>
            <div className='col-12 col-md-6' style={{maxHeight: '65vh'}}>
                <h5> Ver Tabla </h5>
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
                                            <td> { activitie?.nombre } </td>

                                            <td>
                                                <button onClick={()=>handleEdit(activitie?.id)} className="btn btn-primary"> Editar </button>
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
