<?php
class PlanAnual extends MethodsCrud {

    private $uploadDocument;

    public function __construct() {
        parent::__construct('clubs_itesi');

        $this->uploadDocument = new UploadDocument();
    }

    public function get_all_planAnual () {

        $query = "
                    SELECT * FROM clubs_itesi.archivos_plan_anual_club
                ";
        return $this->select_query($query);
    }

    public function add_new_planAnual ($plan_info, $nameClub) {

        $path_destination = './clubs/' . $plan_info->id_club . '_' . $nameClub . '/plan_anual/' ;

        $response = $this->uploadDocument->upload_file($_FILES['file_info'], $path_destination, 240000);

        if ($response['upload']) {
            $query = "INSERT INTO archivos_plan_anual_club (nombre, ruta, id_club) VALUES (?, ?, ?)";
            $data = array(
                $plan_info->nombre,
                $response['file_destination'],
                $plan_info->id_club
            );
            return $this->insert_query($query, array($data));
        } else {
            return $response;
        }

    }





}