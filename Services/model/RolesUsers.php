<?php

class RolesUsers extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_roles () {
        $query = "
            SELECT * FROM clubs_itesi.roles;
        ";

        return $this->select_query($query);
    }

    public function add_new_role ($role_name) {
        $query = "
                INSERT INTO clubs_itesi.roles (nombre)
                VALUES (?);
            ";
        $params = array($role_name);

        return $this->insert_query($query, array($params));
    }

    public function update_role ($role_info) {
        $query = "
            UPDATE clubs_itesi.roles SET nombre = ?
            WHERE id = ?";

        $data = array($role_info->name,
                      $role_info->id);
        return $this->update_delete_query($query, array($data));
    }

    public function delete_role ($id_role) {
        $query = "DELETE FROM clubs_itesi.roles WHERE id = ?";

        $data = array($id_role);

        return $this->update_delete_query($query, array($data));
    }

    public function get_rol_name_by_rol_id_user(){
        $query = "
            SELECT roles.id, roles.nombre FROM roles
            INNER JOIN usuarios
            ON usuarios.id_rol=roles.id
        ";
        
        return $this->select_query($query);
    }
}