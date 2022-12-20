import React from 'react'
import { useParams } from 'react-router-dom';
import { requestPost } from '../../helpers/requestPost'
import { useForm } from '../../hooks/useForm';

export const NewActivite = () => {

  const { club_id } = useParams();

  const { dataForm, onInputChange, onResetForm } = useForm({});


  const handleAddActivitie = () => {

    const body = {
      nombre : dataForm.name,
      modalidad: dataForm.modality,
      fecha: dataForm.date,
      objetivo_desarrollo_s: dataForm.objectiveDevelopment,
      atributo_egreso: dataForm.egressAttribute,
      calificacion_valor: dataForm.calificationValue,
      tipo_evidencia: dataForm.typeEvidence,
      responsable: dataForm.responsible,
      observaciones: dataForm.observations,
      estatus: dataForm.status,
      modelo: dataForm.model,
      dominio: dataForm.domain,
      id_habilidad_desarrollada: dataForm.id_habilidad_desarrollada, 
      id_tipo_actividad: dataForm.id_tipo_actividad,
      id_club: club_id,
      id_idioma: dataForm.id_idioma,
    }

    const formData = new FormData();
    formData.append('activity_info', JSON.stringify(body));

    requestPost('add_activity', formData)
      .then( resp => {
        console.log(resp);
      })
  }

  return (
    <div className='container'>
        <h3 className='text-center mt-3 mb-3'> Agregar nueva actividad </h3>
        
        <form>
            
            <div className='form-floating mb-3'>
              <input type="text" onChange={onInputChange} name='name' class="form-control" id="floatingName" placeholder="" />
              <label for="floatingName">Nombre</label>
            </div>
            
            <div class="form-floating mb-3">
              <select class="form-select" onChange={onInputChange} name='id_tipo_actividad' id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el tipo de la actividad</option>
                <option value="1">Trabajo en Equipo</option>
              </select>
              <label for="floatingSelect">Tipo</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="date" class="form-control" id="floatingAttribut" />
              <label for="floatingAttribut">Fecha de registro</label>
            </div>

            <div className='form-floating mb-3'>
              <textarea class="form-control" id="floatingObjetive" ></textarea>
              <label for="floatingObjetive"> Objetivo de desarrollo </label>
            </div>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingAttribut" placeholder="name@example.com" />
              <label for="floatingAttribut">Atributo Egreso</label>
            </div>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingAbility" />
              <label for="floatingAbility">Habilidad desarollada</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingValue" />
              <label for="floatingValue"> Valor </label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Idioma</label>
            </div>

            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el responsable de la actividad</option>
                <option value="1">Terminado</option>
                <option value="2">Progreso</option>
                <option value="3">Inicial</option>
              </select>
              <label for="floatingSelect">Responsable</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Modelo</label>
            </div>


            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Observaciones</label>
            </div>

            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el estado de la actividad</option>
                <option value="1">Terminado</option>
                <option value="2">Progreso</option>
                <option value="3">Inicial</option>
              </select>
              <label for="floatingSelect">Estatus</label>
            </div>

        </form>
    </div>
  )
}
