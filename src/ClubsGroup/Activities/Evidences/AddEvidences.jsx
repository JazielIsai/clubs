import React from 'react'

export const AddEvidences = () => {



  return (
    <div className='container'>
        <form>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingName" placeholder="" />
              <label for="floatingName">Nombre</label>
            </div>
            
            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingDesc" placeholder="" />
              <label for="floatingName">Descripcion</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" class="form-control" id="floatingDate" placeholder="" value={Date()}/>
              <label for="floatingName">Fecha</label>
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
