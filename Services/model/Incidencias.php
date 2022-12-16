<?php

class Incidencias extends MethodsCrud
{

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_incidencias(){
        $query="SELECT * FROM clubs_itesi.incidencias;";

        echo $this->select_query($query);
    }

    public function get_incidencias_by_Activity($activity_id){
        $query="SELECT 
                        i.motivo, i.fecha";
    }
}
