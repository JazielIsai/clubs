<?php
class PlanAnual extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_planAnual () {

        $query = "
                SELECT * FROM clubs_itesi.archivos_plan_anual_club
                ";
        return $this->select_query($query);
    }

    public function add_new_planAnual ($plan_info) {

        $query = "
                INSERT INTO clubs_itesi.archivos_plan_anual_club(nombre, ruta, id_club) VALUES (?,?,?);
                ";
        $params = array($plan_info->nombre, $plan_info->ruta, $plan_info->id_club);
        return $this->insert_query($query, array($params));
    }





}