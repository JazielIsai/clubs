<?php

class Plantel extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_campuses () {
        $query = "SELECT * FROM plantel";
        return $this->select_query($query);
    }

    public function add_campuses ($name_campus) {
        $query = "
            INSERT INTO plantel (nombre)
            VALUES (?);
        ";
        $params = array($name_campus);

        return $this->insert_query($query, array($params));
    }
    public function update_campuses ($name_campus, $id_campus) {
        $query = "
            UPDATE clubs_itesi.plantel p SET p.nombre = ?
            WHERE p.id = ?;
        ";

        $params = array($name_campus, $id_campus);

        return $this->update_delete_query($query, array($params));
    }

    public function delete_campuses ($id_campus) {
        $query = "
            DELETE FROM plantel WHERE id = ?;
        ";
        $params = array($id_campus);

        return $this->update_delete_query($query, array($params));
    }
}