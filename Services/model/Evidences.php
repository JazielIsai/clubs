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

    public function update_evidence ($evidence_info) {
        $query = "UPDATE evidencia SET nombre = ?, tipo = ?, ruta = ?, id_actividad = ?
        WHERE id = ?";

        $data = array($evidence_info->nombre, $evidence_info->tipo, $evidence_info->ruta, $evidence_info->id_actividad,
                $evidence_info->id);
        return $this->update_delete_query($query, array($data));
    }

    
  
}