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

    public function add_club ($club_info) {
        $query = "
            INSERT INTO clubes (name, objetivo, estatus, id_plantel, id_especialidad, id_categoria_club)
            VALUES (?, ?, ?, ?, ?, ?);
        ";
        $params = array($club_info->name, $club_info->objetivo, $club_info->estatus, $club_info->id_plantel, $club_info->id_especialidad, $club_info->id_categoria_club);

        return $this->insert_query($query, array($params));
    }

    public function update_club ($club_info) {
        $query = "
        UPDATE clubes SET name = ?, objetivo = ?, estatus = ?, id_plantel = ?, 
        id_especialidad = ?, id_categoria_club = ?
        WHERE id = ?";

        $data = array(
            $club_info->name,
            $club_info->objetivo,
            $club_info->estatus,
            $club_info->id_plantel,
            $club_info->id_especialidad,
            $club_info->id_categoria_club,
            $club_info->id
        );

        return $this->update_delete_query($query, array($data));
    }

    public function delete_club ($id_club) {
        $query = "DELETE FROM clubes WHERE id = ?";

        $data = array($id_club);

        return $this->update_delete_query($query, array($data));
    }


}