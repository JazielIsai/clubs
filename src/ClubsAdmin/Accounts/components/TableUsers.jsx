import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';

export const TableUsers = () => {

    const navigate = useNavigate();

    const {data: users } = useFetch_RequestGet('get_all_users');
    const {data: roles } = useFetch_RequestGet('get_all_roles');

    const [getColumnUsers, setColumUsers] = useState(null);
    const [getDataUsers, setDataUsers] = useState(null);
    const [getDataRoles, setDataRoles] = useState(null);

    useEffect( () => {
        try {
            console.log(JSON.parse(users));
            setDataRoles(JSON.parse(roles));
            setColumUsers(JSON.parse(users)[0]);
            setDataUsers(JSON.parse(users));
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
                            <th scope="col"> Actualizar rol </th>
                            <th scope="col"> Editar usuario </th>
                            <th scope="col"> Eliminar</th>

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
                                        <td>
                                            <div className="">
                                                <select className="form-select">
                                                    {
                                                        getDataRoles &&
                                                        getDataRoles.map( (role, index) => (
                                                            <option
                                                                key={index}
                                                                value={role?.id_rol}
                                                                selected={role?.nombre == user?.rol_usuario  ? true : false}
                                                            >
                                                                {role?.nombre}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </td>

                                        <td>
                                            <button onClick={() => handleNavigateEditUser(user?.id)}
                                                    className="btn btn-success">
                                                Actualizar rol
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={()=>handleNavigateEditUser(user?.id)} class="btn btn-primary"> Editar </button>
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
