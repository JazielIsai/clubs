import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardNumeric } from '../../components/CardNumeric';
import { useNavigate, NavLink } from 'react-router-dom';
import { NavigationByClub } from './NavigationByClub';
import {BsPerson} from 'react-icons/bs';
import {FcList} from 'react-icons/fc';
import {TbCalendarEvent} from 'react-icons/tb';
import {useDataCollectionRequest} from "../../hooks/useDataCollectionRequest";

export const DashboardByClub = () => {

  const {id, club_name} = useParams();

  const { dataCollectionRequest : getDataByClub } = useDataCollectionRequest(
      `get_club_by_id&club_id=${id}`,
      'row'
  )

  const { dataCollectionRequest : getMembersByClub } = useDataCollectionRequest(
      `get_existing_members_by_club&club_id=${id}`,
      'row'
  );

  const { dataCollectionRequest : getActivitiesByClub } = useDataCollectionRequest(
      `get_count_activities_by_club&club_id=${id}`,
      'row'
    );

  const { dataCollectionRequest: getEvents } = useDataCollectionRequest(
      'get_count_activities_public',
      'row')

  const navigate = useNavigate();

  
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
              <CardNumeric numeric={ `${getEvents?.count_activities_public}` } description='Eventos' icon={<TbCalendarEvent style={{width: '100%', fontSize: '60px' }} />} styles={{width: '100%'}} />
            </div>
          </div>
          
          
        </div>
      </div>

    </div>
  )
}
