import React from 'react'
import { requestPost } from '../../helpers/requestPost';
import { useForm } from '../../hooks/useForm';

export const EditClub = () => {

    const { dataForm, onInputChange, onResetForm } = useForm({});


    const handleSendPost = (e) => {
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
                            <select onChange={onInputChange} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected>Escoje la especialidad</option>
                                <option value="1">Irapuato</option>
                            </select>
                            <label for="floatingSelect">Especialidad</label>
                        </div>

                    </div>
                    <div className='col-12 col-md-6'>
                        <div class="form-floating mb-3">
                            <select onChange={onInputChange} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected>Escoje la categoría</option>
                                <option value="1">Irapuato</option>
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
                            <select onChange={onInputChange} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected>Escoje el Plantel</option>
                                <option value="1">Irapuato</option>
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
