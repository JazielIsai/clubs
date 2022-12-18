<?php

class Actividad extends MethodsCrud {
    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_activities_by_club ($club_id) {
        $query = "
            SELECT a.id, a.nombre, a.modalidad, a.objetivo_desarrollo_s, a.atributo_egreso, a.calificacion_valor,
                   a.tipo_evidencia, a.responsable, a.observaciones, a.estatus, a.modelo, a.dominio/*,
                   habilidades.nombre AS habilidad, tipo_actividad.nombre AS tipo_actividad, clubes.name AS club, idioma.idioma AS idioma*/
            FROM actividad a
            /*INNER JOIN habilidades ON habilidades.id = a.id_habilidad_desarrollada
            INNER JOIN tipo_actividad ON tipo_actividad.id = a.id_tipo_actividad
            INNER JOIN clubes ON clubes.id = a.id_club
            INNER JOIN idioma ON idioma.id = a.id_idioma*/
            WHERE a.id_club = ?;
        ";

        $params = array($club_id);

        return $this->select_query($query, $params);
    }

    public function get_activities_by_id ($activitie_id) {
        $query = "
            SELECT a.id, a.nombre, a.modalidad, a.objetivo_desarrollo_s, a.atributo_egreso, a.calificacion_valor,
                   a.tipo_evidencia, a.responsable, a.observaciones, a.estatus, a.modelo, a.dominio,
                   a.id_habilidad_desarrollada, a.id_tipo_actividad, a.id_club, a.id_club
            FROM actividad a
            WHERE a.id = ?;
        ";

        $params = array($activitie_id);

        return $this->select_query($query, $params);
    }

}