import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardNumeric } from '../../components/CardNumeric';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import { useNavigate, NavLink } from 'react-router-dom';
import { NavigationByClub } from './NavigationByClub';

export const DashboardByClub = () => {

  const {id} = useParams();

  const {data} = useFetch_RequestGet(`get_club_by_id&club_id=${id}`);

  const navigate = useNavigate();

  const [ getDataByClub, setDataByClub ] = useState(null);

  

  useEffect( () => {

    try {

      console.log(JSON.parse(data)[0], id);
      setDataByClub(JSON.parse(data)[0]);

    } catch (err) {
      console.log(err);
    }

  }, [data] )
  
  return (
    <div className='container'>
      <div className='d-flex flex-column justify-content-center'>
        <h2 className=''>  {getDataByClub?.nombre}  </h2>
        
        <div className='row'>
          
          <div className='col-md-3 col-12'>
            
            <NavigationByClub />
            
          </div>
          
          <div className='col-md-6 col-12'>
            <h5> Cuadro de trabajo </h5>

          </div>

          <div className='col-md-3 col-12'>
            <div className='d-flex w-100 gap-2 justify-content-center align-middle'>
              <CardNumeric styles={{width: '100%'}} />
            </div>
          </div>
          
          
        </div>
      </div>

    </div>
  )
}
