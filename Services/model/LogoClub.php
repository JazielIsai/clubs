<?php

class LogoClub extends MethodsCrud
{
    public function __construct() 
    {
        parent::__construct('clubs_itesi');
    }

    public function get_logo_by_club($id_club) {
        $query = "SELECT id, name, ruta FROM logo_clubs WHERE id_club = ?";

        $params = array($id_club);

        return $this->select_query($query, $params);
    }

    public function add_logo($logo_data) {
        $query = "
        INSERT INTO logo_clubs (name, ruta, id_club)
        VALUES (?, ?, ?)";

        $data = array($logo_data->name, $logo_data->ruta, $logo_data->id_club);

        return $this->insert_query($query, array($data));
    }
}
