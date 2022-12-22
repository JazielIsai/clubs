import {useContext, useState} from 'react';
import {AlertError, requestGet, requestPost} from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../Context';
import ITESI_TECNM from '../../Assets/img/ITESI-TECNM.png';
import LogoITESI from '../../Assets/img/LogoITESI.png';

export const Login = () => {


  const { login } = useContext(AuthContext);

  const {email, password, onInputChange} = useForm({
  email:'',
  password:''
  });
  

  const onSubmit = (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append('email', `${email}`);
    formData.append('password', `${password}`);

    requestGet(`existing_user&email=${email}&password=${password}`)
      .then(resp=>{

        console.log(resp);

        if (resp.includes('Error: missing info.') || resp.includes('Error: user not found.')) {
          AlertError('Error', 'Usuario o contraseña incorrectos');
          throw new Error('Error: user not found.');
        }
        
        // const user = JSON.parse(resp);
        
        login(JSON.parse(resp)[0]);
        
      })
    
    
    // console.log({email, password});

    // login({user_id: 1, name: 'Jaz', lastname: 'Pérez', email, rol_user: 1});
    
  }


  return (
    <div className='container-fluid'>
      <div className='d-flex flex-column justify-content-center'>
        <img src={ITESI_TECNM} alt="Logo ITESM" className=' img-fluid m-auto' style={{ maxWidth: '65%', maxHeight: 130}} />
      </div>

      <div className='container ' style={{minHeight: 'calc(100vh - 200px - 50px)'}}>
        
        <div className="row h-100" style={{minHeight: 'calc(100vh - 200px - 200px)'}}>
          <div className='col-md-6 m-auto'>
            
            <div className=' d-flex flex-column align-middle m-auto '>

              <img src={LogoITESI} alt='Logo del itesi' className='w-50 m-auto' />

            </div>

          </div>

          <div className='col-md-6 p-5 m-auto'>
            <div>
              <h1 className='text-center'>Bienvenido</h1>
              <p className='text-center'>Inicia sesión para continuar</p>
            </div>
            <form className="d-flex flex-column align-middle m-auto" onSubmit={onSubmit} >
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={email}
                  onChange={onInputChange}
                  placeholder="name@example.com"
                  name="email"
                />
                <label htmlFor="floatingInput">Correo electronico</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  value={password}
                  onChange={onInputChange}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                />
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mt-3 w-25"> Ingresar </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  )
}
