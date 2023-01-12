
<?php

class ClubSpecialty extends MethodsCrud {
    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_clubs_speciality () {
        $query = "SELECT * FROM especialidad_club";
        return $this->select_query($query);
    }

    public function add_clubs_speciality ($name_speciality) {
        $query = "
            INSERT INTO especialidad_club (nombre)
            VALUES (?);
        ";
        $params = array($name_speciality);

        return $this->insert_query($query, array($params));
    }

    public function update_clubs_speciality ($name_speciality, $id_speciality) {
        $query = "
            UPDATE especialidad_club SET nombre = ?
            WHERE id = ?
        ";

        $params = array($name_speciality, $id_speciality);
        return $this->update_delete_query($query, array($params));
    }

    public function delete_clubs_speciality ($id_speciality) {
        $query = "
            DELETE FROM especialidad_club WHERE id = ?;
        ";
        $params = array($id_speciality);

        return $this->update_delete_query($query, array($params));
    }

}