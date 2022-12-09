import React from 'react'

export const RegisterUser = () => {
  return (
    <section className='container'>
      
      <h2 className='mt-3 mb-3'> Registrar Usuarios </h2>

      <form>
        
        <div className="form-group mt-3">
          <label for="name_user"> Nombre del Usuario: </label>
          <input type="text" className="form-control" id="name_user" placeholder="Ej: Juan" name="name_user" />
        </div>
        
        <div className="form-group mt-3">
          <label for="last_name_user"> Apellido del Usuario: </label>
          <input type="text" className="form-control" id="last_name_user" placeholder="Ej: Perez" name="last_name_user" />
        </div>
        
        <div className="form-group mt-3">
          <label for="email_user"> Email del Usuario: </label>
          <input type="text" className="form-control" id="email_user" placeholder="Ej:" name="email_user" />
        </div>
        
        <div className="form-group mt-3">
          <label for="password_user"> Contraseña del Usuario: </label>
          <input type="text" className="form-control" id="password_user" placeholder="Ej:" name="password_user" />
        </div>
        
        <div className="form-group mt-3">
          <label for="password_user"> Confirmar Contraseña del Usuario: </label>
          <input type="text" className="form-control" id="password_user" placeholder="Ej:" name="password_user" />
        </div>
        
        <div className="form-group mt-3">
          <label for="role_user"> Rol del Usuario: </label>
          <select className="form-control" id="role_user" name="role_user">
            <option value="1">Administrador</option>
            <option value="2">Lider</option>
            <option value="3">Miembro</option>
          </select>
        </div>

        <div className="form-group mt-3">  
          <label for="club_user"> Club del Usuario: </label>
          <select className="form-control" id="club_user" name="club_user">
            <option value="1">Ajedrez</option>
            <option value="2">Futbol</option>
            <option value="3">Basquetbol</option>
          </select>
        </div>

        <div className="mt-3 d-flex justify-content-end">
          <input type="submit" className="btn btn-success" value="Guardar Club" id="" />
        </div>

      </form>

    </section>
  )
}
