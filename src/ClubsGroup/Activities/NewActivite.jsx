import React from 'react'

export const NewActivite = () => {


  return (
    <div className='container'>
        <h3 className='text-center mt-3 mb-3'> Agregar nueva actividad </h3>
        
        <form>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingName" placeholder="" />
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
