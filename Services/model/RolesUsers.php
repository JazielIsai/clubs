<?php

class RolesUsers extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_roles () {
        $query = "
            SELECT * FROM roles;
        ";

        return $this->select_query($query);
    }

}