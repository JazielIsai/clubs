<?php

class TypeActivity extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_type_activity () {
        $query = "
            SELECT * FROM tipo_actividad;
        ";

        return $this->select_query($query);
    }

}