<?php

class Plantel extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_campuses () {
        $query = "SELECT * FROM plantel";
        return $this->select_query($query);
    }

}