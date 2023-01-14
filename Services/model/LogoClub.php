<?php

class LogoClub extends MethodsCrud
{
    private $uploadDocument;

    public function __construct() {
        parent::__construct('clubs_itesi');

        $this->uploadDocument = new UploadDocument();

    }

    public function get_logo_by_club ($id_club) {
        $query = "SELECT id, nombre, ruta FROM logo_clubs WHERE id_club = ?";

        $params = array($id_club);

        return $this->select_query($query, $params);
    }

    public function add_logo($logo_data, $nameClub) {

        $path_destination = './clubs_files/' . $logo_data->id_club . '_' . $nameClub . '/logo/' ;

        $response = $this->uploadDocument->upload_file($_FILES['file_logo'], $path_destination, 2097152);

        if ($response['upload']) {

            $query = "
                        INSERT INTO logo_clubs (nombre, ruta, id_club)
                        VALUES (?, ?, ?);
                     ";

            $data = array(
                $logo_data->nombre,
                $response['file_destination'],
                $logo_data->id_club
            );

            return $this->insert_query($query, array($data));
        } else {
            return $response;
        }

    }
}
