import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';

export const UpdateUser = () => {

    const {user_id} = useParams();

    const { data: user } = useFetch_RequestGet('get_user_by_id&user_id='+user_id);
    const {data: rolesUser} = useFetch_RequestGet('get_all_roles');

    const [getUser, setUser] = useState(null);
    const [getRoles, setRoles] = useState(null);

    useEffect(()=>{
        try {
            console.log(JSON.parse(user));
            console.log(JSON.parse(rolesUser));

            setRoles(JSON.parse(rolesUser));
            setUser(JSON.parse(user)[0]);
        } catch (err) {
            console.log(err);
        }
    },[user,rolesUser])




    return (
        <section className='container'>
        
        <h2 className='mt-3 mb-3'> Actualizar Usuario </h2>

        <form>
            
            <div className="form-group mt-3">
                <label for="name_user"> Nombre del Usuario: </label>
                <input type="text" className="form-control" id="name_user" defaultValue={getUser?.nombre} placeholder="Ej: Juan" name="name_user" />
            </div>
            
            <div className="form-group mt-3">
                <label for="email_user"> Email del Usuario: </label>
                <input type="text" className="form-control" defaultValue={getUser?.correo} id="email_user" placeholder="Ej:" name="email_user" />
            </div>
            
            <div className="form-group mt-3">
                <label for="password_user"> Contraseña del Usuario: </label>
                <input type="text" className="form-control" id="password_user" defaultValue={getUser?.contraseña} placeholder="Ej:" name="password_user" />
            </div>
            
            {/* <div className="form-group mt-3">
                <label for="password_user"> Confirmar Contraseña del Usuario: </label>
                <input type="text" className="form-control" id="password_user" placeholder="Ej:" name="password_user" />
            </div> */}
            
            <div className="form-group mt-3">
                <label for="role_user"> Rol del Usuario: </label>
                <select defaultValue={getUser?.id_rol} className="form-control" id="role_user" name="role_user">
                    <option>Escoje algun rol</option>
                    {
                        getRoles !== null &&
                        getRoles !== undefined &&
                            getRoles.map( (role, index) => {
                                return(
                                    <option key={index} value={role.id} > {role.nombre} </option>
                                )
                            } )
                    }
                </select>
            </div>

            <div className="form-group mt-3">  
                <label for="club_user"> Club del Usuario: </label>
                <select className="form-control" id="club_user" name="club_user">
                    <option value="1">Ajedrez</option>
                    <option value="2">Futbol</option>
                    <option value="3">Basquetbol</option>
                </select>
            </div>

            <div className="mt-3 d-flex justify-content-end">
                <input type="submit" className="btn btn-success" value="Guardar Club" id="" />
            </div>

        </form>

        </section>
    )
}
