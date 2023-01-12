<?php
class Especialidad extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_especialidades () {

        $query = "
                SELECT * FROM clubs_itesi.especialidad_miebro
                ";
        return $this->select_query($query);
    }

    public function add_new_especialidad ($especialidad_info) {

        $query = "
                INSERT INTO clubs_itesi.especialidad_miebro(nombre) VALUES (?);
                ";
        $params = array($especialidad_info->nombre);
        return $this->insert_query($query, array($params));
    }





}