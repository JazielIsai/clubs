import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardNumeric } from '../../components/CardNumeric';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import { useNavigate, NavLink } from 'react-router-dom';
import { NavigationByClub } from './NavigationByClub';
import {BsPerson} from 'react-icons/bs';
import {FcList} from 'react-icons/fc';

export const DashboardByClub = () => {

  const {id} = useParams();

  const {data} = useFetch_RequestGet(`get_club_by_id&club_id=${id}`);
  const {data: membersByClub} = useFetch_RequestGet(`get_existing_members_by_club&club_id=${id}`);
  const {data: activitiesByClub} = useFetch_RequestGet(`get_count_activities_by_club&club_id=${id}`);

  const navigate = useNavigate();

  const [ getDataByClub, setDataByClub ] = useState(null);
  const [ getMembersByClub, setMembersByClub ] = useState(null);
  const [ getActivitiesByClub, setActivitiesByClub ] = useState(null);
  

  useEffect( () => {

    try {

      // console.log(data[0], id);
      
      setMembersByClub(JSON.parse(membersByClub)[0]);
      setActivitiesByClub(JSON.parse(activitiesByClub)[0]);
      setDataByClub(JSON.parse(data)[0]);
      

    } catch (err) {
      console.log(err);
    }

  }, [data, membersByClub] )
  
  return (
    <div className='container'>
      <div className='d-flex flex-column justify-content-center'>
        <h2 className=''>  Club de: {getDataByClub?.name}  </h2>
        
        <div className='row'>
          
          <div className='col-md-3 col-12'>
            
            <NavigationByClub />
            
          </div>
          
          <div className='col-md-6 col-12'>
            <h5> Cuadro de trabajo </h5>

          </div>

          <div className='col-md-3 col-12'>
            <div className='d-flex flex-column w-100 gap-2 justify-content-center align-middle'>
              <CardNumeric numeric={getActivitiesByClub?.count_activities_by_club} description='Actividades' icon={<FcList style={{width: '100%', fontSize: '60px' }} />} styles={{width: '100%'}} />
              <CardNumeric numeric={ `${getMembersByClub?.member_by_club}` } description='Miembros' icon={<BsPerson style={{width: '100%', fontSize: '60px' }} />} styles={{width: '100%'}} />
              <CardNumeric numeric='' description='Actividades' icon styles={{width: '100%'}} />

            </div>
          </div>
          
          
        </div>
      </div>

    </div>
  )
}
