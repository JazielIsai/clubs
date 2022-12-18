<?php
class Clubes extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_all_clubs () {

        $query = "
                SELECT clubes.id, clubes.name, clubes.objetivo, clubes.fecha_creacion, clubes.estatus,
                       plantel.nombre AS plantel, especialidad_club.nombre AS especialidad_club,
                       categoria_club.nombre AS categoria_club
                FROM clubes
                INNER JOIN plantel ON clubes.id_plantel = plantel.id
                INNER JOIN especialidad_club ON clubes.id_especialidad = especialidad_club.id
                INNER JOIN categoria_club ON clubes.id_categoria_club = categoria_club.id;
                ";

        return $this->select_query($query);
    }

    public function get_club_by_id ($id) {

        $query = "
                SELECT clubes.id, clubes.name, clubes.objetivo, clubes.fecha_creacion, clubes.estatus,
                       plantel.nombre AS plantel, especialidad_club.nombre AS especialidad_club,
                       categoria_club.nombre AS categoria_club
                FROM clubes
                INNER JOIN plantel ON clubes.id_plantel = plantel.id
                INNER JOIN especialidad_club ON clubes.id_especialidad = especialidad_club.id
                INNER JOIN categoria_club ON clubes.id_categoria_club = categoria_club.id
                WHERE clubes.id = ?;
                ";

        $params = array($id);

        return $this->select_query($query, $params);
    }

    public function get_count_clubs () {
        $query = "SELECT COUNT(*) AS count_club FROM clubes;";
        return $this->select_query($query);
    }





}