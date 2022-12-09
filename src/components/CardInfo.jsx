import React from 'react'

export const CardInfo = ({data}) => {

    const onPress = () => {

    }

    return (
        <div class="card" id="card" style={{width: '18rem'}}>
                <img 
                    src="https://liceumgm.com/wp-content/uploads/2018/07/club-de-ajedrez-liceum-3.jpg" 
                    class="card-img-top rounded-circle m-auto mt-2" 
                    id="cardImg" 
                    alt={`${data?.name_club}`} 
                />
                <div class="card-body" id="cardBody">
                    <h5 class="card-title" id="cardTitle"> ${data?.name_club} </h5>
                    <p class="card-text" id="cardText"> Lider del club es: ${data?.manager_club} </p>
                    <p class="card-text" id="cardText"> Miembros del club: ${ data?.student_club } </p>
                    <a href="control_club.php" class="btn btn-primary" id="btnCard"> Ir al Club </a>
                </div>
            </div>
    )
}
