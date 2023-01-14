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

    public function get_acta_constitutiva_by_club ($id_club) {
        $query = "
                SELECT * FROM clubs_itesi.archivos_acta_constitutiva_club WHERE id_club = ?
                ";

        $params = array($id_club);

        return $this->select_query($query, $params);
    }

    public function add_new_acta ($acta_info, $nameClub) {

        $path_destination = './clubs_files/' . $acta_info->id_club . '_' . $nameClub . '/acta_constitutiva/' ;

        $response = $this->uploadDocument->upload_file($_FILES['file_acta_constitutive'], $path_destination, 2097152);

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