<?php

class Evidences extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_evidences_by_activity ($id_activity) {
        $query = "
            SELECT * FROM evidencia WHERE id_actividad = ?;
        ";
        $params = array($id_activity);

        return $this->select_query($query, $params);
    }
}