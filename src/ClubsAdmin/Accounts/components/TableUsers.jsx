import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';

export const TableUsers = () => {

    const navigate = useNavigate();

    const {data: users } = useFetch_RequestGet('get_all_users');

    const [getColumnUsers, setColumUsers] = useState(null);
    const [getDataUsers, setDataUsers] = useState(null);

    useEffect( () => {
        try {
            console.log(JSON.parse(users));
            setDataUsers(JSON.parse(users));
            setColumUsers(JSON.parse(users)[0]);
        }
        catch (err) {
            console.log(err);
        }

    }, [users] )

    const handleNavigateEditUser = (id) => {
        navigate(`/admin/updateUser/${id}`);
    }

    const handleDelete = (id) => {

    }

    return (
        <div>
          
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                         <tr>
                            {
                                getColumnUsers !== null &&
                                getColumnUsers !== undefined && 
                                    Object.keys(getColumnUsers).map( (keyRow, index) => {
                                        
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
                            getDataUsers !== null &&
                            getDataUsers !== undefined && 
                                getDataUsers.map( (user, index) => (
                                    <tr key={index}>

                                        {/* <th scope="row"> {club?.id_club} </th> */}
                                        <td> { user?.nombre } </td>
                                        <td> {user?.correo} </td>
                                        <td>  {user?.fecha_creacion} </td>
                                        <td>  { user?.rol_usuario }   </td>


                                        <td>
                                            <button onClick={()=>handleNavigateEditUser(user?.id)} class="btn btn-primary"> Editar Usuario </button>
                                        </td>
                                        <td>
                                            <button onClick={()=>handleDelete(user?.id)} className="btn btn-danger"> Eliminar </button>
                                        </td>

                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
