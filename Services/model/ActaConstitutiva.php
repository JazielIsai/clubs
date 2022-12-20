<?php

class ActaConstitutiva extends MethodsCrud{
    public function __construct(){
        parent:: __construct('clubs_itesi');
    }

    public function get_all_acta () {

        $query = "
                SELECT * FROM clubs_itesi.archivos_acta_constitutiva_club
                ";
        return $this->select_query($query);
    }

    public function add_new_acta ($acta_info) {

        $query = "
                INSERT INTO clubs_itesi.archivos_acta_constitutiva_club(nombre, ruta, id_club) VALUES (?, ?, ?);
                ";
        $params = array($acta_info->nombre, $acta_info->ruta, $acta_info->id_club);
        return $this->insert_query($query, array($params));
    }


}