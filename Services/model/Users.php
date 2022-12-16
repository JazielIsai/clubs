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

    public function get_user_by_id ($user_id) {
        $query = "
            SELECT usuarios.id, usuarios.nombre, usuarios.correo, usuarios.fecha_creacion, usuarios.contraseña, usuarios.id_rol
            FROM usuarios
            WHERE usuarios.id = ?;
        ";

        $params = array($user_id);

        return $this->select_query($query, $params);
    }

}