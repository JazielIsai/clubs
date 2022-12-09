import React from 'react'



export const RegisterClub = () => {
    
    

    return (
        <section className="container" >

            <h2> Registrar Clubs </h2>

            <div className="d-flex justify-content-end">
                <input type="button" value="Crear Club " className="btn btn-primary" id="create_club_btn" onclick="crearClub();" /> 
            </div>

            <div className="" id="">
                <form className="" >
                    <div className="form-group">
                        <label htmlFor="name_club"> Nombre del Club: </label>
                        <input type="text" className="form-control" id="name_club" placeholder="Ej: Ajedrez" name="name_club" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description_club"> Descripción Club: </label>
                        <input type="text" className="form-control" id="description_club" placeholder="Descripción... " name="description_club" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="manager_club"> Lider del club: </label>
                        <input type="text" className="form-control" id="manager_club" placeholder="Lider..." name="manager_club" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="objective_club"> Objetivo del Club: </label>
                        <input type="text" className="form-control" id="objective_club" placeholder="Objetivo..." name="objective_club" />
                    </div>
                    <div className="form-group submit_create_club_wrap_btn">
                        <input type="submit" className="btn btn-success" value="Guardar" id="submit_form_create_club" />
                    </div>
                </form>
            </div>


        </section>
    )
}
