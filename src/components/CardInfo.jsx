import React from 'react'

export const CardInfo = ({ img, nameClub, liderClub, dateCreated, handleNavigateTo }) => {
    

    return (
        <div class="card" id="card" style={{width: '18rem'}}>
            <img 
                src={img} 
                class="card-img-top rounded-circle m-auto mt-2"
                style={{width: '250px', height: '250px'}} 
                id="cardImg" 
                alt={`${nameClub}`} 
            />
            <div class="card-body" id="cardBody">
                <h5 class="card-title" id="cardTitle"> {nameClub} </h5>
                <p class="card-text" id="cardText"> Lider del club es: {liderClub} </p>
                <p class="card-text" id="cardText"> Fecha de creación: { dateCreated } </p>
                <button class="btn btn-primary" id="btnCard" onClick={()=>handleNavigateTo()}> 
                    Ir al Club
                </button>
            </div>
        </div>
    )
}
