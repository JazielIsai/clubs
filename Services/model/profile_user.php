<?php

class ProfileUser extends MethodsCrud
{
    private $uploadDocument;

    public function __construct() {
        parent::__construct('clubs_itesi');

        $this->uploadDocument = new UploadDocument();

    }

    public function get_photo_by_user ($id_user) 
    {
        $query = "SELECT id_foto, nombre, ruta FROM foto_usuario WHERE id_user = ?";

        $params = array($id_user);

        return $this->select_query($query, $params);
    }

    public function add_photo($photo_data, $nameUser) 
    {

        $path_destination = $_SERVER['DOCUMENT_ROOT'].'/CLUBS/users_files/' . $photo_data->id_user . '_' . $nameUser . '/photo/' ;

        print($path_destination);

        $response = $this->uploadDocument->upload_file($_FILES['file_photo'], $path_destination, 2097152);

        if ($response['upload']) {

            $query = "
                        INSERT INTO foto_usuario (id_foto, nombre, ruta, id_user)
                        VALUES (?, ?, ?, ?);
                    ";

            $data = array(
                $photo_data->nombre,
                $response['file_destination'],
                $photo_data->id_user
            );

            return $this->insert_query($query, array($data));
        } else {
            return $response;
        }

    }
}
