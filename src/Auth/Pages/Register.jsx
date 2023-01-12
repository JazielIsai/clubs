import React from 'react'
import { useForm } from '../../hooks/useForm';


export const Register = () => {

  const {name, lastname, numbercontrol, email, onInputChange, formState} = useForm({});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  }


  return (
    <div className='container'>
        
      <form className='row' onSubmit={onSubmit}>

        <div class="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="Nombre" value={name} name='name' onChange={onInputChange}/>
          <label for="floatingInput">Nombre(s):</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPassword" placeholder="Apellidos" value={lastname} name='lastname' onChange={onInputChange}/>
          <label for="floatingPassword">Apellidos</label>
        </div>

        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPassword" placeholder="N° Control" value={numbercontrol} name='numbercontrol' onChange={onInputChange} />
          <label for="floatingPassword">N° Control:</label>
        </div>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingPassword" placeholder="Correo" value={email} name='email' onChange={onInputChange}/>
          <label for="floatingPassword">Correo: </label>
        </div>

        <div class="">
          <button type="submit" class="btn btn-primary mt-3 w-25" > Registrar </button>
        </div>
      </form>

  </div>
  )
}
