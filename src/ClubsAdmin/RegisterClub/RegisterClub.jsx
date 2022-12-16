import React from 'react'



export const RegisterClub = () => {
    
    

    return (
        <section className="container" >

            <h2> Registrar Clubs </h2>


            <div className="" id="">
                <form className="mt-4" >
                    
                    <div className="form-group mb-3">
                        <label htmlFor="name_club"> Nombre del Club: </label>
                        <input type="text" className="form-control" id="name_club" placeholder="Ej: Ajedrez" name="name_club" />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="description_club"> Descripción Club: </label>
                        <input type="text" className="form-control" id="description_club" placeholder="Descripción... " name="description_club" />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="manager_club"> Lider del club: </label>
                        <input type="text" className="form-control" id="manager_club" placeholder="Lider..." name="manager_club" />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="objective_club"> Objetivo del Club: </label>
                        <input type="text" className="form-control" id="objective_club" placeholder="Objetivo..." name="objective_club" />
                    </div>

                    <div className="mb-3 d-flex justify-content-end ">
                        <input type="submit" className="btn btn-success" value="Guardar registro" id="" />
                    </div>
                </form>
            </div>


        </section>
    )
}
