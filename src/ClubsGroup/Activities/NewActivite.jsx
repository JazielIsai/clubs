import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { requestPost } from '../../helpers/requestPost'
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import { useForm } from '../../hooks/useForm';

export const NewActivite = () => {

  const { club_id } = useParams();

  const {data: typeActivity} = useFetch_RequestGet('get_all_type_activity');
  const {data: skill} = useFetch_RequestGet('get_all_skills');
  const {data: language} = useFetch_RequestGet('get_all_idioms');
  const {data: members} = useFetch_RequestGet('get_users_by_club&club_id='+club_id);

  const { dataForm, onInputChange, onResetForm } = useForm({});

  const [getActivities, setActivities] = useState();
  const [getSkills, setSkills] = useState();
  const [getLanguage, setLanguage] = useState();
  const [getMembers, setMembers] = useState();

  useEffect( () => {

    try {
      console.log(JSON.parse(typeActivity));
      setActivities(JSON.parse(typeActivity));
      setSkills(JSON.parse(skill));
      setLanguage(JSON.parse(language));
      setMembers(JSON.parse(members));

    } catch (err) {
      console.log(err);
    }

  }, [typeActivity, skill, language, members] )

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
                {
                  getActivities && getActivities.map( (item, index) => (
                    <option key={index} value={item.id}> {item.nombre} </option>
                  ))
                }
              </select>
              <label for="floatingSelect">Tipo</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="date" onChange={onInputChange} name='date' class="form-control" id="floatingAttribut" />
              <label for="floatingAttribut">Fecha de registro</label>
            </div>

            <div className='form-floating mb-3'>
              <textarea class="form-control" onChange={onInputChange} name='objectiveDevelopment'  id="floatingObjetive" ></textarea>
              <label for="floatingObjetive"> Objetivo de desarrollo </label>
            </div>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" onChange={onInputChange} name='egressAttribute' id="floatingAttribut" placeholder="name@example.com" />
              <label for="floatingAttribut">Atributo Egreso</label>
            </div>
            
            <div className='form-floating mb-3'>
              <select class="form-select" onChange={onInputChange} name='id_habilidad_desarrollada' id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el tipo de la actividad</option>
                {
                  getSkills && getSkills.map( (item, index) => (
                    <option key={index} value={item.id}> {item.nombre} </option>
                  ))
                }
              </select>
              <label for="floatingAbility">Habilidad desarollada</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" class="form-control" onChange={onInputChange} name='calificationValue' id="floatingValue" />
              <label for="floatingValue"> Calificación Valor </label>
            </div>

            <div className='form-floating mb-3'>
              <select class="form-select" onChange={onInputChange} name='id_idioma' id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el tipo de la actividad</option>
                {
                  getLanguage && getLanguage.map( (item, index) => (
                    <option key={index} value={item.id}> {item.idioma} </option>
                  ))
                }
              </select>
              <label for="floatinglanguage">Idioma</label>
            </div>

            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" onChange={onInputChange} name='responsible' aria-label="Floating label select example">
                <option selected>Escoje el responsable de la actividad</option>
                {
                  getMembers && getMembers.map( (item, index) => (
                    <option key={index} value={item.nombre}> {item.nombre} </option>
                  ))
                }
              </select>
              <label for="floatingSelect">Responsable</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" onChange={onInputChange} name='model' class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Modelo</label>
            </div>


            <div className='form-floating mb-3'>
              <input type="text" onChange={onInputChange} name='observations' class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Observaciones</label>
            </div>

            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el estado de la actividad</option>
                <option value="Terminado">Terminado</option>
                <option value="Progreso">Progreso</option>
                <option value="Inicial">Inicial</option>
              </select>
              <label for="floatingSelect">Estatus</label>
            </div>

            <div className='d-flex justify-content-end'>
              <button type="button" onClick={handleAddActivitie} className="btn btn-success"> Agregar actividad </button>
            </div>

        </form>
    </div>
  )
}
