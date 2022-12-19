
import React, { useEffect, useState } from 'react'
import { CardNumeric } from '../../components/CardNumeric'
import {HiOutlineUserGroup} from 'react-icons/hi';
import {BsPerson} from 'react-icons/bs';

import { Chart } from "react-google-charts";
import { useFetch_RequestGet } from '../../hooks/useFetchGet';

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];


export const Dashboard = () => {

  const { data : countClubs } = useFetch_RequestGet('get_count_clubs');
  const { data : countMembers } = useFetch_RequestGet('get_existing_members');

  const [ getCountClubs, setCountClubs ] = useState(null);
  const [ getCountMembers, setCountMembers ] = useState(null);

  useEffect ( () => {
    try {
      console.log(countMembers);
      setCountClubs(JSON.parse(countClubs)[0]);
      setCountMembers(JSON.parse(countMembers)[0]);
    } catch (err ) {
      console.log(err);
    }
  }, [countClubs, countMembers] )

  return (
    <div className='container-fluid'>
    
      <div className='d-flex gap-2 justify-content-center align-middle'>
        <CardNumeric numeric={getCountClubs?.count_club} description='Clubs' icon={<HiOutlineUserGroup style={{width: '100%', fontSize: '60px' }} />} />
        <CardNumeric numeric={getCountMembers?.TotalMiembros} description='Total Miembros' icon={<BsPerson style={{width: '100%', fontSize: '60px' }} />} />
        <CardNumeric />
      </div>
      
      <div className='container'>
        <div className='d-flex g-2 justify-content-center align-middle'>
          <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
          <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
        </div>
      </div>

      <div className=''>

      </div>

    </div>
  )
}
