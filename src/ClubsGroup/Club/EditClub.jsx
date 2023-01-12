import React, {useEffect, useState} from 'react'
import {AlertToast, requestPost} from '../../helpers';
import { useForm } from '../../hooks/useForm';
import {useNavigate, useParams} from "react-router-dom";
import {useDataCollectionRequest} from "../../hooks/useDataCollectionRequest";

export const EditClub = () => {

    const navigate = useNavigate();
    const { club_id } = useParams();

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const { dataCollectionRequest: getRowClub } = useDataCollectionRequest(
        `get_club_by_id&club_id=${club_id}`,
        'row'
    );

    const { dataCollectionRequest: getSpeciality } = useDataCollectionRequest(
        `get_all_clubs_speciality`,
        'all'
    );

    const { dataCollectionRequest: getCategory } = useDataCollectionRequest(
        `get_all_category_to_club`,
        'all'
    );

    const { dataCollectionRequest: getCampuses } = useDataCollectionRequest(
        `get_all_campuses`,
        'all'
    );

    const [ planAnual, setPlanAnual ] = useState(null);
    const [ actaConstitutiva, setActaConstitutiva ] = useState(null);
    const [ logo, setLogo ] = useState(null);

    const handleChangePlanAnual = (e) => {
        console.log(e.target.files[0]);
        setPlanAnual(e.target.files[0]);
    }

    const handleChangeActaConstitutiva = (e) => {
        setActaConstitutiva(e.target.files[0]);
    }

    const handleChangeLogo = (e) => {
        setLogo(e.target.files[0]);
    }

    const updateFilePlanAnual = () => {

        const body = {
            nombre: planAnual?.name,
            "id_club": parseInt(club_id),
        }

        const formData = new FormData();
        formData.append('plan_info', JSON.stringify(body));
        formData.append('nameClub', getRowClub?.name);
        formData.append('file', planAnual);

        requestPost('add_new_planAnual', formData)
            .then( response => {
                console.log(response);
                AlertToast('Plan anual actualizado correctamente', 'success', 3000);
            } )
            .catch( err => {
                console.log(err);
            } )

    }

    const updateFileActaConstitutiva = () => {

        const body = {
            nombre: actaConstitutiva?.name,
            id_club: parseInt(club_id),
        }

        const formData = new FormData();
        formData.append('acta_info', JSON.stringify(body));
        formData.append('nameClub', getRowClub?.name);
        formData.append('file_info', actaConstitutiva);

        requestPost('add_new_acta', formData)
            .then( response => {
                console.log(response);
                AlertToast('Acta constitutiva actualizada correctamente', 'success', 3000);
            })
            .catch( err => {
                console.log(err);
            } );

    }

    const updateFileLogo = () => {

            const body = {
                nombre: logo?.name,
                id_club: parseInt(club_id),
            }

            const formData = new FormData();
            formData.append('logo_info', JSON.stringify(body));
            formData.append('nameClub', getRowClub?.name);
            formData.append('file_info', logo);

            requestPost('add_logo', formData)
                .then( response => {
                    console.log(response);
                    AlertToast('Logo actualizado correctamente', 'success', 3000);
                })
                .catch( err => {
                    console.log(err);
                } );
    }

    const handleSendPost = (e) => {
        e.preventDefault();

        const body = {
            "id": 1,
            "name": "Ajedrez",
            "objetivo": "Jugar y ganar para la representación del itesi",
            "estatus": "activo",
            "id_plantel": 1,
            "id_especialidad": 1,
            "id_categoria_club": 3
        }

        const formData = new FormData();
        formData.append('club_info', JSON.stringify(body));

        requestPost('update_club', formData)
            .then( response => {
                console.log(response);
                if (response.trim() == 1) {

                    AlertToast('Edicción exitoso', 'success', 3000);
                    updateFilePlanAnual();
                    updateFileActaConstitutiva();
                    updateFileLogo();
                } else {
                    AlertToast('Edicción fallido', 'error', 3000);
                }
            })
            .catch( err => {
                console.log(err);
            })
    }
    
    return (
        <section className="container" >

            <h2> Editar Club </h2>

            <div className="" id="">
                <form className="mt-4" >

                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="form-floating mb-3">
                                <input type="text" onChange={onInputChange} className="form-control" id="name_club" defaultValue={getRowClub?.name} name="name" />
                                <label htmlFor="name_club"> Nombre del Club: </label>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-floating mb-3">
                                <input type="text" disabled defaultValue={getRowClub?.fecha_creacion} className="form-control" id="date_created" name="date_created" />
                                <label htmlFor="date_created"> Fecha de creación: </label>
                            </div>
                        </div>
                    </div>


                    <div className="form-floating mb-3">
                        <input type="text" onChange={onInputChange} className="form-control" id="objective_club" defaultValue={getRowClub?.objetivo} name="objetivo" />
                        <label htmlFor="objective_club"> Objetivo del Club: </label>
                    </div>

                    <div className='row'>
                        <div className='col-12 col-md-6'>

                            <div className="form-floating mb-3">
                                <input type="text" onChange={onInputChange} className="form-control" name="manager_club" id="floatingInput"  />
                                <label htmlFor="floatingInput"> Lider del club: </label>
                            </div>

                        </div>

                        <div className='col-12 col-md-6'>
                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} className="form-select" name={'id_categoria_club'} id="floatingSelect" aria-label="Floating label select example">
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



                    <div className='row'>

                        <div className='col-12 col-md-6'>
                            <div class="form-floating mb-3">
                                <select onChange={onInputChange} class="form-select" name={'id_plantel'} id="floatingSelect" aria-label="Floating label select example">
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
                            <div className="form-floating mb-3">
                                <select onChange={onInputChange} className="form-select" name={'id_especialidad'}
                                        id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Escoge la especialidad</option>
                                    {
                                        getSpeciality !== null &&
                                        getSpeciality !== undefined &&
                                        getSpeciality.map((speciality, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={speciality.id}
                                                    selected={speciality.nombre == getRowClub?.especialidad_club ? true : false}
                                                >
                                                    {speciality.nombre}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label htmlFor="floatingSelect">Especialidad</label>
                            </div>
                        </div>

                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="annual_plan"> Plan anual: </label>
                        <input type="file" className="form-control" id="annual_plan" onChange={handleChangePlanAnual} name="file_plan_anual[]" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="constitutive_act"> Acta constitutiva: </label>
                        <input type="file" className="form-control" id="constitutive_act" onChange={handleChangeActaConstitutiva} name="file_constitutive_act[]" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="club_logo"> Logo del Club: </label>
                        <input type="file" className="form-control" id="club_logo" onChange={handleChangeLogo} name="file_logo[]" />
                    </div>

                    <div className="mb-3 d-flex justify-content-end ">
                        <input type="submit" className="btn btn-success" value="Guardar" id="" onClick={handleSendPost} />
                    </div>

                </form>
            </div>


        </section>
    )
}
