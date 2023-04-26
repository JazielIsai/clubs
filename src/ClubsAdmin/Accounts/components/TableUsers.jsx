import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import {AlertError, AlertToast, requestPost} from "../../../helpers";
import {stringify} from "query-string";

export const TableUsers = () => {

    const navigate = useNavigate();


    const {data: users } = useFetch_RequestGet('get_all_users');
    const {data: roles } = useFetch_RequestGet('get_all_roles');

    const [getColumnUsers, setColumUsers] = useState(null);
    const [getDataUsers, setDataUsers] = useState(null);
    const [getDataRoles, setDataRoles] = useState(null);

    useEffect( () => {
        try {
            setDataRoles(JSON.parse(roles));
            setColumUsers(JSON.parse(users)[0]);
            setDataUsers(JSON.parse(users));
        }
        catch (err) {
            console.log(err);
        }

    }, [users,roles] )



    const handleNavigateEditUser = (id) => {
        console.log("id_user: ", id);
        navigate(`/admin/updateUser/${id}`);
    }
    
    const handleUpdateRolUser = (e) => {


        console.log("Rol", JSON.parse(e.target.value).id_rol);
        console.log("Id", JSON.parse(e.target.value).id_user);

        const body = {
            id_rol: JSON.parse(e.target.value).id_rol,
            id: JSON.parse(e.target.value).id_user
        }

        console.log("body ->", body);

        const formData = new FormData();
        formData.append('user_rol_info', JSON.stringify(body));

        requestPost('update_role_user', formData)
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
                                                <select className="form-select" onChange={handleUpdateRolUser}>
                                                    <option disable="true" selected >{user?.rol_usuario}</option>
                                                    {
                                                        getDataRoles &&
                                                        getDataRoles.map( (role, index) => (
                                                            role?.nombre !== user?.rol_usuario &&

                                                            <option
                                                                key={index}
                                                                value={JSON.stringify({id_rol:role?.id, id_user:user?.id})}
                                                            >
                                                                {role?.nombre}
                                                             </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
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
