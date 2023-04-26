<?php

class Users extends MethodsCrud {

    private $miembros;
    public function __construct()
    {
        parent::__construct('clubs_itesi');
        $this->miembros = new UsuariosMiembros();
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
        $err = "";

        if(empty(trim($email))){
            $err .= "Please enter email. ";
        }

        if(empty(trim($password))){
            $err .= "Please enter your password. ";
        }

        if (!empty($err)) {
            return $err;
        }

        $user_exists = $this->get_user_by_email_and_password($email, $password);

        if (empty($user_exists)) {
            return "User does not exist";
        }

        if ($password != $user_exists[0]['contraseña']) {
            return "Password is not correct";
        }

        return $user_exists;

    }

    public function get_user_by_id ($user_id) {
        $query = "
            SELECT usuarios.id, usuarios.nombre, usuarios.correo, usuarios.fecha_creacion,usuarios.id_club, usuarios.contraseña, usuarios.id_rol
            FROM usuarios
            WHERE usuarios.id = ?;
        ";

        $params = array($user_id);

        return $this->select_query($query, $params);
    }

    public function add_user ($user_info) {
        $email = $user_info->correo;
        $password = $user_info->contraseña;
        $err = "";

        if(empty(trim($email))){
            $err .= "Please enter email. ";
        }

        if(empty(trim($password))){
            $err .= "Please enter your password. ";
        }

        if (!empty($err)) {
            return $err;
        }

        $user_exists = $this->get_user_by_email($email);

        if (!empty($user_exists)) {
            return "User already exists";
        }

        if (strlen(trim($password)) < 6) {
            return "Password must have at least 6 characters";
        }

        if ($password != $user_info->confirm_contraseña) {
            return "Password did not match";
        }

        if (empty($user_info->nombre) || empty($user_info->fecha_creacion || empty($user_info->id_rol)) ) {
            return "Some of the following fields are empty: name, creation_date, id_rol";
        }

        $password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO usuarios (nombre, correo, contraseña, fecha_creacion, id_club, id_rol)
                VALUES (?, ?, ?, ?, ?, ?);";
        
        $data = array($user_info->nombre,
                    $email,
                    $password,
                    $user_info->fecha_creacion,
                    $user_info->id_club,
                    $user_info->id_rol);
        
        $var_id_club = $user_info->id_club;


        if ($var_id_club != NULL)
        {
            $this->miembros->add_member_user($user_info);
        }

        return $this->insert_query($query, array($data));
    }
    
    public function update_user ($user_info) {
        $query = "UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, fecha_creacion = ?, id_club = ?, id_rol = ?
        WHERE id = ?";

        $data = array($user_info->nombre, $user_info->correo, $user_info->contraseña, $user_info->fecha_creacion,
                    $user_info->id_club, $user_info->id_rol, $user_info->id);

        return $this->update_delete_query($query, array($data));
    }

    public function get_user_by_email_and_password($email, $password){
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
        return $this->select_query($query, array($email, $password));
    }

}
