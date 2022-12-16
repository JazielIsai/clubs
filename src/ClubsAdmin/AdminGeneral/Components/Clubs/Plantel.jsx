import React, { useEffect, useState } from 'react'
import { useFetch_RequestGet } from '../../../../hooks/useFetchGet';

export const Plantel = () => {

    const { data } = useFetch_RequestGet('get_all_campuses');

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

  return (
    <div className='container'>
        <h3> Plantel </h3>
        <div className='row'>
            <div className='col-12 col-md-6'>
                <h5> Registrar </h5>
                <form>
                    <div className='form-group'>
                        <label htmlFor='name'> Nombre </label>
                        <input type='text' className='form-control' id='name' />
                    </div>
                    <div className='d-flex mt-3 justify-content-end'>
                        <button type='submit' className='btn btn-primary'> Guardar </button>
                    </div>
                </form>
            </div>
            <div className='col-12 col-md-6'>
                <h5> Ver Tabla </h5>
                <table className="table">
                    <thead>
                        <tr>
                            {
                                getColumn !== null &&
                                getColumn !== undefined && 
                                    Object.keys(getColumn).map( (keyRow, index) => {
                                        
                                        if (keyRow == 'id') { return null; }

                                        return(
                                            <th key={index} scope="col"> {keyRow} </th>
                                        )
                                    })
                                    
                            }
                            <th scope="col"> Ir a </th>

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

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
