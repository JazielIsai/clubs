import React from 'react'

export const AddEvidences = () => {

  return (
    <div className='container'>
        <form>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingName" placeholder="" />
              <label for="floatingName">Nombre</label>
            </div>
            
            <div class="form-floating mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                <option selected>Escoje el tipo </option>
                <option value="1">Trabajo en Equipo</option>
              </select>
              <label for="floatingSelect">Tipo</label>
            </div>

            <div className='form-floating mb-3'>
              <textarea class="form-control" id="floatingReference" ></textarea>
              <label for="floatingReference"> Referencia </label>
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupFile01">Subir archivos</label>
              <input type="file" class="form-control" id="inputGroupFile01" />
            </div>

            <div className='d-flex justify-content-end'>
              <button className='btn btn-success'>
                Enviar evidencia
              </button>
            </div>
        </form>
    </div>
  )
}
