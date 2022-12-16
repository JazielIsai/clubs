<?php

class Miembros extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_members () {

        $query = "
                SELECT * FROM miembros_club;
                ";

        return $this->select_query($query);
    }
    

    public function get_member_by_id ($id) {

        $query = "
                SELECT * FROM miembros_club WHERE id = ?;
                ";

        $params = array($id);

        return $this->select_query($query, $params);
    }


}