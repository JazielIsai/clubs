<?php

class UploadDocument {

    public function __construct() {

    }

    public function upload_file ($file_info, $path_destination, $define_size) {

        if (!isset($file_info)) {
            return "File is empty";
        }

        // upload document
        $file = $file_info;
        $file_name = $file['name'];
        $file_tmp = $file['tmp_name'];
        $file_size = $file['size'];
        $file_error = $file['error'];
        $file_type = $file['type'];

        if (!file_exists($path_destination)) {
            mkdir($path_destination, 0755, true);
        }

        $file_ext = explode('.', $file_name);
        $file_ext = strtolower(end($file_ext));

        $allowed = array('pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'txt');

        // move the file upload to folder MovementIndex
        if (in_array($file_ext, $allowed)) {
            if ($file_error === 0) {
                if ($file_size <= $define_size) {
                    $file_name_new = uniqid('', true) . '.' . $file_ext;
                    $path_destination = $path_destination . $file_name_new;
                    if (move_uploaded_file($file_tmp, $path_destination)) {
                        // echo $file_destination;
                        return [
                            'upload' => true,
                            'file_destination' => $path_destination
                        ];

                    } else {
                        return 'Error al subir el archivo';
                    }
                } else {
                    return 'El archivo es muy grande';
                }
            } else {
                return 'Hubo un error al subir el archivo';
            }
        } else {
            return 'El archivo no es valido';
        }

    }

}