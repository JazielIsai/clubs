<?php

class Users extends MethodsCrud {
    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_users () {
        $query = "
            SELECT usuarios.id, usuarios.nombre, usuarios.correo, usuarios.fecha_creacion,
                   roles.nombre as rol_usuario
            FROM usuarios
            INNER JOIN roles ON usuarios.id_rol = roles.id;
        ";

        return $this->select_query($query);
    }

    public function existing_user ($email, $password) {
        $query = "
            SELECT usuarios.id, usuarios.nombre, usuarios.correo, usuarios.contraseña,
                    usuarios.fecha_creacion, usuarios.id_rol, usuarios.id_club, 
                    roles.nombre AS rol,
                    clubes.name AS club
            FROM usuarios
            INNER JOIN roles ON usuarios.id_rol = roles.id
            LEFT JOIN clubes ON usuarios.id_club = clubes.id
            WHERE usuarios.correo = ? AND usuarios.contraseña = ?;
        ";

        $params = array($email, $password);

        $data = $this->select_query($query, $params);

        if ( count($data) > 0 ) {
            return $data;
        } else {
            return 'Error: user not found.';
        }

    }

    public function get_user_by_id ($user_id) {
        $query = "
            SELECT usuarios.id, usuarios.nombre, usuarios.correo, usuarios.fecha_creacion, usuarios.contraseña, usuarios.id_rol
            FROM usuarios
            WHERE usuarios.id = ?;
        ";

        $params = array($user_id);

        return $this->select_query($query, $params);
    }
    
    public function add_user ($user_info) {
        $query = "INSERT INTO usuarios (nombre, correo, contraseña, fecha_creacion, id_rol)
                VALUES (?, ?, ?, ?, ?)";
        
        $data = array($user_info->nombre, $user_info->correo, $user_info->contraseña, 
        $user_info->fecha_creacion, $user_info->id_rol);

        return $this->insert_query($query, array($data));
    }
    
    public function update_user ($user_info) {
        $query = "UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, fecha_creacion = ?, id_rol = ?
        WHERE id = ?";

        $data = array($user_info->nombre, $user_info->correo, $user_info->contraseña, $user_info->fecha_creacion,
        $user_info->id_rol, $user_info->id);

        return $this->update_delete_query($query, array($data));
    }

}
