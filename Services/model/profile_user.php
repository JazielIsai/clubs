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

        $path_destination = './users_files/' . $photo_data->id_user . '_' . $nameUser . '/photo/' ;

        $response = $this->uploadDocument->upload_file($_FILES['file_photo'], $path_destination, 2097152);

        $query = "SELECT id_foto, ruta FROM foto_usuario WHERE id_user = ?";
        $id =array($photo_data->id_user);
        $result = $this->select_query($query, $id);
        if((count($result) > 0)){
            $path_file = $result[0]['ruta'];
            unlink($path_file);

            if ($response['upload']) {

                $query = "UPDATE foto_usuario SET nombre = ?, ruta = ?
                        WHERE id_user = ?";

                $data = array(
                    $photo_data->nombre,
                    $response['file_destination'],
                    $photo_data->id_user
                );

                return $this->update_delete_query($query, array($data));
            }
                else {
                            return $response;
                }
        }
        else{
        if ($response['upload']) {

            $query = "
                        INSERT INTO foto_usuario (nombre, ruta, id_user)
                        VALUES (?, ?, ?);
                    ";

            $data = array(
                $photo_data->nombre,
                $response['file_destination'],
                $photo_data->id_user
            );

            return $this->insert_query($query, array($data));
            }
            else {
                        return $response;
            }
        }




    }
}
