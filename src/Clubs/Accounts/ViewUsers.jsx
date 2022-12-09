import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TableUsers } from './components/TableUsers'

export const ViewUsers = () => {
  
  const navigate = useNavigate();
  
  const goUser = () => {
    navigate('/admin/registerUsers');
  }


  return (
      <div className='container'>
          <h2> Vista de todos los usuarios </h2>
            <div className='d-flex flex-nowrap justify-content-end'>
                <input type={'button'} className='btn btn-primary' value={'Crear nuevo usuario'} onClick={goUser} />
            </div>
          <div>
            
            <TableUsers />

          </div>
      </div>
  )
}
