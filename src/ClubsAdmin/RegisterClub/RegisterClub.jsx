import React, { useEffect, useState } from 'react'
import { AlertError } from '../../helpers/Alerts/AlertError';
import { AlertSuccess } from '../../helpers/Alerts/AlertSuccess';
import { requestPost } from '../../helpers/requestPost';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm'



export const RegisterClub = () => {

    const { data: campuses } = useFetch_RequestGet('get_all_campuses');
    const { data: specialties } = useFetch_RequestGet('get_all_clubs_speciality');
    const { data: categories } = useFetch_RequestGet('get_all_category_to_club');

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const [ getCampuses, setCampuses ] = useState(null);
    const [ getSpecialties, setSpecialties ] = useState(null);
    const [ getCategories, setCategories ] = useState(null);

    const [ getClubId, setClubId ] = useState(null);


    useEffect ( () => {

        try {
            setCampuses(JSON.parse(campuses));
            setSpecialties(JSON.parse(specialties));
            setCategories(JSON.parse(categories));
        } catch (err ) {
            console.log(err);
        }

    }, [campuses, categories, specialties] ) 

    const handleSendPost = (e) => {
        e.preventDefault();

        const body = {
            "name": dataForm.name_club,
            "objetivo": dataForm.objective_club,
            // "fecha_creacion": dataForm.date_created,
            "estatus": "activo",
            "id_plantel": dataForm.id_campus,
            "id_especialidad": dataForm.id_specialty,
            "id_categoria_club": dataForm.id_category
        }

        Object.entries(body).forEach( ([key, value]) => {
            if (value == '' || value == null || value == undefined) {
                AlertError('Error', 'Todos los campos son obligatorios');
                throw new Error('Todos los campos son obligatorios');
            }
        })

        const formData = new FormData();
        formData.append('club_info', JSON.stringify(body));

        requestPost('add_club', formData)
            .then( response => {
                if ( !(response.includes('Error: missing info.')) ) {
                    AlertSuccess('Registro exitoso', `El club: ${dataForm?.name_club}  se ha registrado correctamente`);
                    setClubId(response);
                    onResetForm();
                }
                // AlertSuccess('Registro exitoso', 'El registro se ha realizado correctamente')
                // AlertError('Registro fallido', 'El registro no se pudo realizar')
                console.log(response);
            })
            .catch( err => {
                console.log(err);
            })

    }

    const loadFilePlanAnual = (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('plan_anual', file);

        requestPost('add_club', formData)
            .then( response => {
                console.log(response);
            } )

    }

    const loadFileActaConstitutiva = (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('acta_constitutiva', file);

        requestPost('add_club', formData)
            .then( response => {
                console.log(response);
            }
        )

    }

    return (
        <section className="container" >

            <h2> Registrar Clubs </h2>


            <div className="" id="">
                <form className="mt-4" >
                    
                    <div className="form-group mb-3">
                        <label htmlFor="name_club"> Nombre del Club: </label>
                        <input type="text" onChange={onInputChange} className="form-control" id="name_club" placeholder="Ej: Ajedrez" name="name_club" />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="objective_club"> Objetivo del Club: </label>
                        <input type="text" onChange={onInputChange} className="form-control" id="objective_club" placeholder="Objetivo..." name="objective_club" />
                    </div>

                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            
                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} name='id_specialty' class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoje la especialidad</option>
                                    {
                                        getSpecialties && getSpecialties.map( specialty => (
                                            <option key={specialty.id} value={specialty.id}> {specialty.nombre} </option>
                                        ))
                                    }
                                </select>
                                <label for="floatingSelect">Especialidad</label>
                            </div>

                        </div>
                        <div className='col-12 col-md-6'>
                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} name='id_category' class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoje la categoría</option>
                                    {
                                        getCategories && getCategories.map( category => (
                                            <option key={category.id} value={category.id}> {category.nombre} </option>
                                        ))
                                    }
                                </select>
                                <label for="floatingSelect">Categoria del Club</label>
                            </div>
                        </div>
                        
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="manager_club"> Lider del club: </label>
                        <input type="text" onChange={onInputChange} className="form-control" id="manager_club" placeholder="Lider..." name="manager_club" />
                    </div>
                    
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} name='id_campus' class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoje el Plantel</option>
                                    {
                                        getCampuses && getCampuses.map( campus => (
                                            <option key={campus.id} value={campus.id}> {campus.nombre} </option>
                                        ))
                                    }
                                </select>
                                <label for="floatingSelect">Plantel</label>
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className="form-group mb-3">
                                <label htmlFor="date_created"> Fecha de creación: </label>
                                <input type="date" onChange={onInputChange} className="form-control" id="date_created" placeholder="Objetivo..." name="date_created" />
                            </div>
                        </div>
                    </div>
                    

                    <div className="form-group mb-3">
                        <label htmlFor="annual_plan"> Plan anual: </label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="annual_plan" 
                            placeholder="Lider..." 
                            // name="manager_club" 
                            multiple 
                            name="files[]"
                            onChange={loadFilePlanAnual}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="constitutive_act"> Acta constitutiva: </label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="constitutive_act" 
                            placeholder="Lider..." 
                            // name="manager_club" 
                            multiple
                            name="files[]"
                            onChange={loadFileActaConstitutiva}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="club_logo"> Logo del Club: </label>
                        <input type="file" className="form-control" id="club_logo" placeholder="Lider..." name="manager_club" />
                    </div>


                    <div className="mb-3 d-flex justify-content-end ">
                        <input type="button" onClick={handleSendPost} className="btn btn-success" value="Guardar registro" id="" />
                    </div>
                </form>
            </div>


        </section>
    )
}
