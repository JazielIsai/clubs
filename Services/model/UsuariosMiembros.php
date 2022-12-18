<?php

class UsuariosMiembros extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_users_by_club($club_id) {
        $query = "
        SELECT miembros_club.id, miembros_club.no_control, miembros_club.nombre,
        miembros_club.apellido_paterno, miembros_club.apellido_materno, miembros_club.sexo,
        miembros_club.correo, miembros_club.telefono, miembros_club.rango, miembros_club.semestre,
        especialidad_miebro.nombre AS especialidad_miembro, rol_miembro_club.nombre AS rol_miembro,
        clubes.name AS nombre_club
        FROM miembros_club
        INNER JOIN especialidad_miebro ON miembros_club.id_especialidad = especialidad_miebro.id
        INNER JOIN rol_miembro_club ON miembros_club.id_rol_member_club = rol_miembro_club.id
        INNER JOIN clubes ON miembros_club.id_club= clubes.id
        WHERE clubes.id = ?;
        ";
        
        $params = array($club_id);

        return $this->select_query($query, $params);
    }

    public function add_new_user_club($user_info) {
        $query = "
        INSERT INTO miembros_club (no_control, nombre, apellido_paterno, apellido_materno, sexo, correo, telefono, rango, semestre, id_especialidad, id_rol_member_club, id_club)";
        $query .= "VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";

        $data = array($user_info->no_control, $user_info->nombre, $user_info->apellido_paterno, $user_info->apellido_materno, $user_info->sexo, $user_info->correo, $user_info->telefono, $user_info->rango, $user_info->semestre, $user_info->id_especialidad, $user_info->id_rol_member_club, $user_info->id_club);

        return $this->insert_query($query, array($data));
    }

    public function get_all_members () {

        $query = "
                SELECT * FROM miembros_club;
                ";

        return $this->select_query($query);
    }

    public function existing_members(){
        $query = "
                SELECT COUNT(no_control) AS TotalMiembros FROM miembros_club; 
        ";
        return $this->select_query($query);
    }

    public function existing_members_by_club($id_club){
        $query = "
                SELECT COUNT(no_control) AS Miembros_por_club FROM miembros_club 
                /*INNER JOIN clubes ON miembros_club.id_club= clubes.id*/ WHERE id_club = ?; 
        ";
        $params = array($id_club);
        return $this->select_query($query, $params);
    }

    public function get_members_by_speciality($id_speciality){
        $query = "
                SELECT * FROM miembros_club WHERE id_especialidad = ?;
        ";
        $params = array($id_speciality);
        return $this->select_query($query, $params);
    }

  
}