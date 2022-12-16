import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet'

export const EditActivitie = () => {

  const { club_id, id_activitie } = useParams();

  const {data} = useFetch_RequestGet(`get_activities_by_id&activities_id=${id_activitie}}`);

  const [ getActivities, setActivities ] = useState();

  useEffect( () => {
    
    try {
      setActivities(JSON.parse(data)[0]);
    } catch (err) {
      console.log(err);
    }

  }, [data] )

  return (
    <div className='container'>
        <h3 className='text-center mt-3 mb-3'> Editar actividad </h3>

        <form>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" defaultValue={getActivities?.nombre} id="floatingName" placeholder="" />
              <label for="floatingName">Nombre</label>
            </div>
            
            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
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
              <textarea class="form-control" id="floatingObjetive" defaultValue={getActivities?.objetivo_desarrollo_s} ></textarea>
              <label for="floatingObjetive"> Objetivo de desarrollo Sustentable </label>
            </div>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" defaultValue={getActivities?.atributo_egreso} id="floatingAttribut" placeholder="name@example.com" />
              <label for="floatingAttribut">Atributo Egreso</label>
            </div>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingAbility" />
              <label for="floatingAbility">Habilidad desarollada</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" class="form-control" defaultValue={getActivities?.calificacion_valor} id="floatingValue" />
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
              <input type="text" class="form-control" defaultValue={getActivities?.observaciones} id="floatinglanguage" />
              <label for="floatinglanguage">Observaciones</label>
            </div>

            <div class="form-floating">
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
