import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardInfo } from '../../../components/CardInfo';
import { useFetch_RequestGet } from '../../../hooks/useFetchGet';
import buhosItesi from '../../../Assets/img/buhosItesi.jpg';


export const ListCardClubs = ({dataClub}) => {
    
    const navigate = useNavigate();

    const img = "https://liceumgm.com/wp-content/uploads/2018/07/club-de-ajedrez-liceum-3.jpg";
    
    const {data} = useFetch_RequestGet('get_all_clubs');

    const [ getDataClubs, setDataClubs ] = useState(null);

    const navigateToClub = (id, club_name) => {
        navigate(`/admin/viewClubs/${id}/${club_name}`);
    }

    useEffect( () => {
        try {
            console.log(JSON.parse(data));
            setDataClubs(JSON.parse(data));
        } catch (err) {
            console.log(err);
        }
    },[data] )


    return (
        <div className='d-flex flex-wrap gap-3'>
            
            {
                getDataClubs !== null &&
                getDataClubs !== undefined &&
                getDataClubs.map( (dataClub, index) => (
                    <CardInfo
                        key={index}
                        img={buhosItesi}
                        nameClub={dataClub?.name}
                        liderClub={dataClub?.lider}
                        dateCreated={dataClub?.fecha_creacion}
                        handleNavigateTo={() => navigateToClub(dataClub?.id, dataClub?.name)}
                    />
                ))
                    

            }


        </div>
    )
}
