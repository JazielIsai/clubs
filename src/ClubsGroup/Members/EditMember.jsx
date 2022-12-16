import React from 'react'

export const EditMember = () => {
  
    return (
        <div>

             <form>
            
                <div className='form-floating mb-3'>
                    <input type="text" class="form-control" id="floatingNumberControl" placeholder="" />
                    <label for="floatingNumberControl">Numero de Control</label>
                </div>
                
                <div className='form-floating mb-3'>
                    <input type="text" class="form-control" id="floatingName" placeholder="" />
                    <label for="floatingName">Nombre(s)</label>
                </div>
                
                <div className='d-flex justify-content-around'>
                    <div className='form-floating mb-3'>
                        <input type="text" class="form-control" id="floatingLastNameFather" placeholder="" />
                        <label for="floatingLastNameFather">Apellido Paterno</label>
                    </div>

                    <div className='form-floating mb-3'>
                        <input type="text" class="form-control" id="floatingLastNameMather" placeholder="" />
                        <label for="floatingLastNameMather">Apellido Materno</label>
                    </div>
                </div>

                <div class="form-floating mb-3">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected>Escoje una especialiadd </option>
                        <option value="1">Sistemas Computacionales</option>
                    </select>
                    <label for="floatingSelect">Especialidad</label>
                </div>

                <div className='d-flex flex-row justify-content-between'>
                    
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Escoja su sexo </option>
                            <option value="1">Hombre</option>
                            <option value="1">Mujer</option>

                        </select>
                        <label for="floatingSelect">Sexo</label>
                    </div>

                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Escoje su rol </option>
                            <option value="1"> Presidente </option>
                            <option value="1"> Secretario </option>
                            <option value="1"> Tesorero </option>
                        </select>
                        <label for="floatingSelect"> Rol </label>
                    </div>

                </div>

                <div className='form-floating mb-3'>
                    <input type={'email'} class="form-control" id="floatingEmail" ></input>
                    <label for="floatingEmail"> Email </label>
                </div>

                <div className='form-floating mb-3'>
                    <input type={'text'} class="form-control" id="floatingPhone" ></input>
                    <label for="floatingPhone"> Celular </label>
                </div>

                <div className='form-floating mb-3'>
                    <input type={'text'} class="form-control" id="floatingMember" ></input>
                    <label for="floatingMember"> Miembro </label>
                </div>
                
            </form>
        </div>
    )
}
