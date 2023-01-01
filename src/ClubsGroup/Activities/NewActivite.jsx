import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { requestPost, AlertToast } from '../../helpers'
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

  const handleAddActivity = () => {

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
          if ( !(resp.includes('Error: missing info.')) ) {
            AlertToast("Se ha guardado la actividad correctamente", "success", 3000);
          } else {
            AlertToast("Ha ocurrido un error al guardar la actividad", "error", 3000);
          }
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

            <div className={'row'}>

                <div className={'col-md-6 col-12'}>
                    <div className="form-floating mb-3">
                        <select className="form-select" onChange={onInputChange} name='id_tipo_actividad'
                                id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Escoge el tipo de la actividad</option>
                            {
                                getActivities && getActivities.map((item, index) => (
                                    <option key={index} value={item.id}> {item.nombre} </option>
                                ))
                            }
                        </select>
                        <label htmlFor="floatingSelect">Tipo</label>
                    </div>
                </div>

                <div className={'col-md-6 col-12'}>
                    <div className='form-floating mb-3'>
                        <input type="date" onChange={onInputChange} name='date' className="form-control"
                               id="floatingAttribut"/>
                        <label htmlFor="floatingAttribut">Fecha de registro</label>
                    </div>
                </div>

            </div>

            <div className='form-floating mb-3'>
                <textarea className="form-control" cols={5} onChange={onInputChange} name='objectiveDevelopment'
                          id="floatingObjetive"></textarea>
                <label htmlFor="floatingObjetive"> Objetivo de desarrollo </label>
            </div>

            <div className={'row'}>

                <div className={'col-md-6 col-12'}>
                    <div className='form-floating mb-3'>
                        <select className="form-select" onChange={onInputChange} name='id_habilidad_desarrollada'
                                id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Escoge la habilidad principal ha desarrollar</option>
                            {
                                getSkills && getSkills.map((item, index) => (
                                    <option key={index} value={item.id}> {item.nombre} </option>
                                ))
                            }
                        </select>
                        <label htmlFor="floatingAbility">Habilidad Desarrollada</label>
                    </div>
                </div>

                <div className={'col-md-6 col-12'}>
                    <div className='form-floating mb-3'>
                        <select className="form-select" onChange={onInputChange} name='id_idioma' id="floatingSelect"
                                aria-label="Floating label select example">
                            <option selected>Escoge el tipo de la actividad</option>
                            {
                                getLanguage && getLanguage.map((item, index) => (
                                    <option key={index} value={item.id}> {item.idioma} </option>
                                ))
                            }
                        </select>
                        <label htmlFor="floatinglanguage">Idioma</label>
                    </div>
                </div>

            </div>


            <div className='form-floating mb-3'>
              <input type="text" class="form-control" onChange={onInputChange} name='egressAttribute' id="floatingAttribut" placeholder="name@example.com" />
              <label for="floatingAttribut">Atributo Egreso</label>
            </div>


            <div className={'row'}>

                <div className={'col-md-6 col-12'}>
                    <div className='form-floating mb-3'>
                        <input type="text" className="form-control" onChange={onInputChange} name='calificationValue'
                               id="floatingValue"/>
                        <label htmlFor="floatingValue"> Calificación Valor </label>
                    </div>
                </div>

                <div className={'col-md-6 col-12'}>
                    <div className='form-floating mb-3'>
                        <select className="form-select" onChange={onInputChange} name='modality' id="floatingModality"
                                aria-label="Floating label select example">
                            <option selected>Escoge el tipo de la actividad</option>
                            <option value="Presencial"> Presencial </option>
                            <option value="Virtual"> Virtual </option>
                            <option value="Hibrido"> Hibrido </option>
                        </select>
                        <label htmlFor="floatingModality">Modalidad</label>
                    </div>
                </div>

            </div>

            <div className={'row'}>

                <div className={'col-md-6 col-12'}>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" onChange={onInputChange} name='responsible'
                                aria-label="Floating label select example">
                            <option selected>Escoge el responsable de la actividad</option>
                            {
                                getMembers && getMembers.map((item, index) => (
                                    <option key={index} value={item.nombre}> {item.nombre} </option>
                                ))
                            }
                        </select>
                        <label htmlFor="floatingSelect">Responsable</label>
                    </div>
                </div>

                <div className={'col-md-6 col-12'}>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Escoge el estado de la actividad</option>
                            <option value="Programada">Programada</option>
                            <option value="Realizada">Realizada</option>
                            <option value="Reagendada">Reagendada</option>
                            <option value="Candelada">Candelada</option>
                        </select>
                        <label htmlFor="floatingSelect">Estatus</label>
                    </div>
                </div>

            </div>


            <div className='form-floating mb-3'>
              <input type="text" onChange={onInputChange} name='model' class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Modelo</label>
            </div>


            <div className='form-floating mb-3'>
              <input type="text" onChange={onInputChange} name='observations' class="form-control" id="floatinglanguage" />
              <label for="floatinglanguage">Observaciones</label>
            </div>


            <div className='d-flex justify-content-end'>
              <button type="button" onClick={handleAddActivity} className="btn btn-success"> Agregar actividad </button>
            </div>

        </form>
    </div>
  )
}
