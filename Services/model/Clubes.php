<?php
class Clubes extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_clubs () {

        $query = "
                SELECT * FROM clubes;
                ";

        return $this->select_query($query);
    }

    public function get_club_by_id ($id) {

        $query = "
                SELECT * FROM clubes WHERE id = ?;
                ";

        $params = array($id);

        return $this->select_query($query, $params);
    }
}