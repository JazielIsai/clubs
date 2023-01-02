import React, {useEffect, useState} from 'react'
import { requestPost } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import {useNavigate, useParams} from "react-router-dom";
import {useFetch_RequestGet} from "../../hooks/useFetchGet";

export const EditClub = () => {

    const navigate = useNavigate();
    const { club_id } = useParams();

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const { data: getClub } = useFetch_RequestGet(`get_club_by_id&club_id=${club_id}`);
    const { data : speciality_by_club } = useFetch_RequestGet('get_all_clubs_speciality');
    const { data : category_by_club } = useFetch_RequestGet('get_all_category_to_club');
    const { data : campuses } = useFetch_RequestGet('get_all_campuses');

    const [ getRowClub, setRowClub ] = useState();
    const [ getSpeciality, setSpeciality ] = useState();
    const [ getCategory, setCategory ] = useState();
    const [ getCampuses, setCampuses ] = useState();

    useEffect( () => {

        try {

            setRowClub(JSON.parse(getClub)[0]);
            setSpeciality(JSON.parse(speciality_by_club));
            setCategory(JSON.parse(category_by_club));
            setCampuses(JSON.parse(campuses));

        } catch (err) {
            console.log(err);
        }

    }, [ speciality_by_club, category_by_club, campuses ] );


    const handleSendPost = (e) => {
        e.preventDefault();

        const body = {
            "id": 1,
            "name": "Ajedrez",
            "objetivo": "Jugar y ganar para la representación del itesi",
            "fecha_creacion": "2022-12-16 01:40:37",
            "estatus": "activo",
            "id_plantel": 1,
            "id_especialidad": 1,
            "id_categoria_club": 3
        }

        const formData = new FormData();
        formData.append('club_info', JSON.stringify(dataForm));

        requestPost('clubs', formData)
            .then( response => {
                // AlertSuccess('Registro exitoso', 'El registro se ha realizado correctamente')
                // AlertError('Registro fallido', 'El registro no se pudo realizar')
                console.log(response);
            })
            .catch( err => {
                console.log(err);
            })
    }

    const updateFilePlanAnual = (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('plan_anual', file);

        requestPost('add_club', formData)
            .then( response => {
                console.log(response);
            } )

    }

    const updateFileActaConstitutiva = (event) => {
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

            <h2> Editar Club </h2>

            <div className="" id="">
                <form className="mt-4" >

                    <div className="form-group mb-3">
                        <label htmlFor="name_club"> Nombre del Club: </label>
                        <input type="text" onChange={onInputChange} className="form-control" id="name_club" defaultValue={getRowClub?.name} name="name_club" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="objective_club"> Objetivo del Club: </label>
                        <input type="text" onChange={onInputChange} className="form-control" id="objective_club" defaultValue={getRowClub?.objetivo} name="objective_club" />
                    </div>

                    <div className='row'>
                        <div className='col-12 col-md-6'>

                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoge la especialidad</option>
                                    {
                                        getSpeciality !== null &&
                                        getSpeciality !== undefined &&
                                            getSpeciality.map( (speciality, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={speciality.id}
                                                        selected={speciality.nombre == getRowClub?.especialidad_club ? true : false}
                                                    >
                                                        {speciality.nombre}
                                                    </option>
                                                )
                                            } )
                                    }
                                </select>
                                <label for="floatingSelect">Especialidad</label>
                            </div>

                        </div>

                        <div className='col-12 col-md-6'>
                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoge la categoría</option>
                                    {
                                        getCategory !== null &&
                                        getCategory !== undefined &&
                                            getCategory.map( (category, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={category.id}
                                                        selected={category.nombre == getRowClub?.categoria_club ? 'selected' : false}
                                                    >
                                                        {category.nombre}
                                                    </option>
                                                )
                                            } )
                                    }
                                </select>
                                <label for="floatingSelect">Categoría del Club</label>
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
                                <select onChange={onInputChange} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoge el Plantel</option>
                                    {
                                        getCampuses !== null &&
                                        getCampuses !== undefined &&
                                            getCampuses.map( (campus, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={campus.id}
                                                        selected={campus.nombre == getRowClub?.plantel ? true : false}
                                                    >
                                                        {campus.nombre}
                                                    </option>
                                                )
                                            } )
                                    }
                                </select>
                                <label for="floatingSelect">Plantel</label>
                            </div>
                        </div>

                        <div className='col-12 col-md-6'>
                            <div className="form-group mb-3">
                                <label htmlFor="date_created"> Fecha de creación: </label>
                                <input type="text" disabled defaultValue={getRowClub?.fecha_creacion} className="form-control" id="date_created" name="date_created" />
                            </div>
                        </div>

                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="annual_plan"> Plan anual: </label>
                        <input type="file" className="form-control" id="annual_plan" placeholder="Lider..." name="manager_club" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="constitutive_act"> Acta constitutiva: </label>
                        <input type="file" className="form-control" id="constitutive_act" placeholder="Lider..." name="manager_club" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="club_logo"> Logo del Club: </label>
                        <input type="file" className="form-control" id="club_logo" placeholder="Lider..." name="manager_club" />
                    </div>

                    <div className="mb-3 d-flex justify-content-end ">
                        <input type="submit" className="btn btn-success" value="Guardar registro" id="" />
                    </div>

                </form>
            </div>


        </section>
    )
}
