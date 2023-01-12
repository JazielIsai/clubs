<?php

class ActaConstitutiva extends MethodsCrud {

    private $uploadDocument;

    public function __construct(){
        parent:: __construct('clubs_itesi');

        $this->uploadDocument = new UploadDocument();
    }

    public function get_all_acta () {

        $query = "
                SELECT * FROM clubs_itesi.archivos_acta_constitutiva_club
                ";
        return $this->select_query($query);
    }

    public function add_new_acta ($acta_info, $nameClub) {

        $path_destination = './clubs/' . $acta_info->id_club . '_' . $nameClub . '/plan_anual/' ;

        $response = $this->uploadDocument->upload_file($_FILES['file_info'], $path_destination, 240000);

        if ($response['upload']) {

            $query = "
                        INSERT INTO clubs_itesi.archivos_acta_constitutiva_club (nombre, ruta, id_club) 
                        VALUES (?, ?, ?);
                     ";

            $params = array(
                $acta_info->nombre,
                $response['file_destination'],
                $acta_info->id_club
            );

            return $this->insert_query($query, array($params));

        } else {
            return $response;
        }


    }


}