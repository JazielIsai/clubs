<?php

class rol_member_club extends MethodsCrud
{
    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_rol_members_clubs () 
    {
        $query = "SELECT * FROM clubs_itesi.rol_miembro_club";

        return $this->select_query($query);
    }
    

    public function get_rol_member_club_by_id ($id) 
    {

        $query = "SELECT * FROM clubs_itesi.rol_miembro_club WHERE id = ?;";

        $params = array($id);

        return $this->select_query($query, $params);
    }


    public function add_rol_member_club($nombre)
    {
        $query = "INSERT INTO clubs_itesi.rol_miembro_club (nombre) VALUES (?)";

        $params = array($nombre);

        return $this->insert_query($query, array($params));
    }

    public function update_name_rol_member_club ($name_rol_member_club, $id_rol_member_club) {
        $query = "
            UPDATE clubs_itesi.rol_miembro_club SET nombre = ?
            WHERE id = ?
        ";

        $params = array($name_rol_member_club, $id_rol_member_club);
        return $this->update_delete_query($query, array($params));
    }

    public function delete_rol_member_club ($id_rol_member_club) {
        $query = "
            DELETE FROM clubs_itesi.rol_miembro_club WHERE id = ?;
        ";
        $params = array($id_rol_member_club);

        return $this->update_delete_query($query, array($params));
    }

}
