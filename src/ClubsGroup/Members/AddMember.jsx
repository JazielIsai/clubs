import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AlertError } from '../../helpers/Alerts/AlertError';
import { AlertSuccess } from '../../helpers/Alerts/AlertSuccess';
import { requestPost } from '../../helpers/requestPost';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';

export const AddMember = () => {

    const { club_id } = useParams();

    const { data : speciality } = useFetch_RequestGet('get_all_speciality');
    const { data : rolesMembers } = useFetch_RequestGet('get_all_rol_members_clubs');
    const { data : clubs } = useFetch_RequestGet('get_all_clubs');

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const [ getSpeciality, setSpeciality ] = useState(null);
    const [ getRolesMembers, setRolesMembers ] = useState(null);
    const [ getClubs, setClubs ] = useState(null);

    useEffect ( () => {
            
        try {
            setSpeciality(JSON.parse(speciality));
            setRolesMembers(JSON.parse(rolesMembers));
            setClubs(JSON.parse(clubs));
        } catch (err ) {
            console.log(err);
        }
        
    }, [speciality, rolesMembers, clubs])


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            "no_control": dataForm.number_control,
            "nombre": dataForm.name,
            "apellido_paterno": dataForm.last_name_father,
            "apellido_materno": dataForm.last_name_mather,
            "sexo": dataForm.sexo,
            "correo": dataForm.email,
            "telefono": dataForm.phone,
            "rango": dataForm.rango,
            "semestre": dataForm.semester,
            "id_especialidad": parseInt(dataForm.id_speciality),
            "id_rol_member_club": parseInt(dataForm.id_rol),
            "id_club": parseInt(club_id)

        }

        Object.entries(body).forEach( ([key, value]) => {
            if (value == '' || value == null || value == undefined) {
                AlertError('Error', 'Todos los campos son obligatorios');
                throw new Error('Todos los campos son obligatorios');
            }
        })

        console.log(body);

        const formData = new FormData();
        formData.append('member_info', JSON.stringify(body));

        requestPost('add_new_member_club', formData)
            .then( response => {
                console.log(response);
                if ( !(response.includes('Error: missing info.')) ){
                    AlertSuccess('Exito', 'Miembro agregado correctamente');
                    onResetForm();
                }
            })
            .catch( err => {
                console.log(err);
            })

    }

    return (
        <div className='container'>
            <form>
                <div className='row'>
                    
                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type="text" onChange={onInputChange} name='number_control' class="form-control" id="floatingNumberControl" placeholder="" />
                            <label for="floatingNumberControl">Numero de Control</label>
                        </div>
                    </div>

                    <div className='col-12 col-md-6'>  
                        <div className='form-floating mb-3'>
                            <input type="text" onChange={onInputChange} name='name' class="form-control" id="floatingName" placeholder="" />
                            <label for="floatingName">Nombre(s)</label>
                        </div>
                    </div>

                </div>
                
                <div className='row'>

                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type="text" onChange={onInputChange} name='last_name_father' class="form-control" id="floatingLastNameFather" placeholder="" />
                            <label for="floatingLastNameFather">Apellido Paterno</label>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type="text" onChange={onInputChange} name='last_name_mather' class="form-control" id="floatingLastNameMather" placeholder="" />
                            <label for="floatingLastNameMather">Apellido Materno</label>
                        </div>
                    </div>

                </div>

                <div class="form-floating mb-3">
                    <select onChange={onInputChange} name='id_speciality' class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option>Escoje una especialiadd </option>
                        {
                            getSpeciality && getSpeciality.map( (speciality, index) => (
                                <option key={index} value={speciality.id}> {speciality.nombre} </option>
                            ))
                        }
                    </select>
                    <label for="floatingSelect">Especialidad</label>
                </div>

                <div className='row'>

                    <div className='col-12 col-md-6'>
                        <div class="form-floating mb-3">
                            <select class="form-select" onChange={onInputChange} name='sexo' id="floatingSelect" aria-label="Floating label select example">
                                <option>Escoja su sexo </option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>

                            </select>
                            <label for="floatingSelect">Sexo</label>
                        </div>
                    </div>

                    <div className='col-12 col-md-6'>
                        <div class="form-floating mb-3">
                            <select onChange={onInputChange} name='id_rol' class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option>Escoje su rol </option>
                                {
                                    getRolesMembers && getRolesMembers.map( (rol, index) => (
                                        <option key={index} value={rol.id}> {rol.nombre} </option>
                                    ))
                                }
                            </select>
                            <label for="floatingSelect"> Rol </label>
                        </div>
                    </div>

                </div>

                <div className='row'>
                    
                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type={'email'} onChange={onInputChange} name='email' class="form-control" id="floatingEmail" ></input>
                            <label for="floatingEmail"> Email </label>
                        </div>
                    </div>

                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type={'text'} onChange={onInputChange} name='phone' class="form-control" id="floatingPhone" ></input>
                            <label for="floatingPhone"> Celular </label>
                        </div>
                    </div>

                </div>
                
                <div className='row'>
                    
                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type={'text'} onChange={onInputChange} name='semester' class="form-control" id="floatingMember" ></input>
                            <label for="floatingMember"> Semestre </label>
                        </div>
                    </div>
                    
                    <div className='col-12 col-md-6'>
                        <div className='form-floating mb-3'>
                            <input type={'text'} onChange={onInputChange} name='rango' class="form-control" id="floatingMember" ></input>
                            <label for="floatingMember"> Rango </label>
                        </div>
                    </div>

                </div>
                
                <div className='d-flex justify-content-end'>
                    <button type="button" onClick={handleSubmit} class="btn btn-success "> Agregar miembro </button>
                </div>

            </form>
        </div>
    )
}
