
<?php

class ClubSpecialty extends MethodsCrud {
    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_clubs_speciality () {
        $query = "SELECT * FROM especialidad_club";
        return $this->select_query($query);
    }

}