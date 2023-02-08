<?php

class Evidences extends MethodsCrud {

    private $uploadDocument;

    public function __construct() {
        parent::__construct('clubs_itesi');

        $this->uploadDocument = new UploadDocument();
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

    public function add_evidence ($new_evidence, $id_club, $nameClub)
    {
        $path_destination = './clubs_files/' . $id_club . '_' . $nameClub . '/evidencias/' . $new_evidence->id_actividad . '/';

        error_log('id_club ' . $id_club);

        $response = $this->uploadDocument->upload_file($_FILES['file_evidencia_info'], $path_destination, 2097152);

        if ($response['upload']) {
            $query = "INSERT INTO evidencia (nombre, descripcion, ruta, id_actividad) VALUES (?, ?, ?, ?)";
            $data = array(
                $new_evidence->nombre,
                $new_evidence->descripcion,
                $response['file_destination'],
                $new_evidence->id_actividad
            );
            return $this->insert_query($query, array($data));
        } else {
            return $response;
        }


    }
}