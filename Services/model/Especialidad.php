<?php
class Especialidad extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_specialties () {

        $query = "
                SELECT * FROM clubs_itesi.especialidad_miebro
                ";
        return $this->select_query($query);
    }

    public function add_new_specialty ($specialty_info) {

        $query = "
                INSERT INTO clubs_itesi.especialidad_miebro(nombre) VALUES (?);
                ";
        $params = array($specialty_info->nombre);
        return $this->insert_query($query, array($params));
    }

    public function update_specialty ($specialty_info) {
        $query = "
                UPDATE clubs_itesi.especialidad_miebro SET nombre = ?
                WHERE id = ?";

        $data = array($specialty_info->nombre,
                      $specialty_info->id);
        return $this->update_delete_query($query, array($data));
    }

    public function delete_specialty ($id_specialty) {
            $query = "DELETE FROM clubs_itesi.especialidad_miebro WHERE id = ?";

            $data = array($id_specialty);

            return $this->update_delete_query($query, array($data));
        }
}