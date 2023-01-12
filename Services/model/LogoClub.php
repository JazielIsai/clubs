<?php

class LogoClub extends MethodsCrud
{
    private $uploadDocument;

    public function __construct() {
        parent::__construct('clubs_itesi');

        $this->uploadDocument = new UploadDocument();

    }

    public function get_logo_by_club($id_club) {
        $query = "SELECT id, name, ruta FROM logo_clubs WHERE id_club = ?";

        $params = array($id_club);

        return $this->select_query($query, $params);
    }

    public function add_logo($logo_data, $nameClub) {

        $path_destination = './clubs/' . $logo_data->id_club . '_' . $nameClub . '/plan_anual/' ;

        $response = $this->uploadDocument->upload_file($_FILES['file_info'], $path_destination, 240000);

        if ($response['upload']) {
            $query = "
                        INSERT INTO logo_clubs (name, ruta, id_club)
                        VALUES (?, ?, ?)
                     ";

            $data = array(
                $logo_data->name,
                $response['file_destination'],
                $logo_data->id_club
            );

            return $this->insert_query($query, array($data));
        } else {
            return $response;
        }

    }
}
