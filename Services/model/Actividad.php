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
                   a.id_habilidad_desarrollada, a.id_tipo_actividad, a.id_club, a.id_club,
                   habilidades.nombre AS habilidad, tipo_actividad.nombre AS tipo_actividad, 
                   clubes.name AS club, idioma.idioma AS idioma
            FROM actividad a
            INNER JOIN habilidades ON habilidades.id = a.id_habilidad_desarrollada
            INNER JOIN tipo_actividad ON tipo_actividad.id = a.id_tipo_actividad
            INNER JOIN clubes ON clubes.id = a.id_club
            INNER JOIN idioma ON idioma.id = a.id_idioma
            WHERE a.id = ?;
        ";

        $params = array($activitie_id);

        return $this->select_query($query, $params);
    }

    public function get_count_activities_by_club ($club_id) {
        $query = "SELECT COUNT(*) count_activities_by_club FROM actividad WHERE id_club = ?";
        $params = array($club_id);
        return $this->select_query($query, $params);
    }
    
    public function add_activity ($activity_info) {
        $query = "INSERT INTO actividad (nombre, modalidad, fecha, objetivo_desarrollo_s, atributo_egreso,
        calificacion_valor, tipo_evidencia, responsable, observaciones, estatus, modelo,
        dominio, id_habilidad_desarrollada, id_tipo_actividad, id_club, id_idioma)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $data = array(
            $activity_info->nombre,
            $activity_info->modalidad,
            $activity_info->fecha,
            $activity_info->objetivo_desarrollo_s,
            $activity_info->atributo_egreso,
            $activity_info->calificacion_valor,
            $activity_info->tipo_evidencia,
            $activity_info->responsable,
            $activity_info->observaciones,
            $activity_info->estatus,
            $activity_info->modelo,
            $activity_info->dominio,
            $activity_info->id_habilidad_desarrollada,
            $activity_info->id_tipo_actividad,
            $activity_info->id_club,
            $activity_info->id_idioma
        );

        return $this->insert_query($query, array($data));
    }
    
    public function update_activity ($activity_info) {

        $query = "UPDATE actividad SET  nombre = ?, modalidad = ?, fecha = ?, objetivo_desarrollo_s = ?,
        atributo_egreso = ?, calificacion_valor = ?, tipo_evidencia = ?, responsable = ?, observaciones = ?,
        estatus = ?, modelo = ?, dominio = ?, id_habilidad_desarrollada = ?, id_tipo_actividad = ?,
        id_club = ?, id_idioma = ?
        WHERE id = ?";

        $data = array($activity_info->nombre, $activity_info->modalidad, $activity_info->fecha,
            $activity_info->objetivo_desarrollo_s, $activity_info->atributo_egreso, $activity_info->calificacion_valor,
            $activity_info->tipo_evidencia, $activity_info->responsable, $activity_info->observaciones,
            $activity_info->estatus, $activity_info->modelo, $activity_info->dominio,
            $activity_info->id_habilidad_desarrollada, $activity_info->id_tipo_actividad, $activity_info->id_club,
            $activity_info->id_idioma, $activity_info->id);

        return $this->update_delete_query($query, array($data));
    }

    public function delete_activity ($id_activity) {
        $query = "DELETE FROM actividad WHERE id = ?";

        $data = array($id_activity);

        return $this->update_delete_query($query, array($data));
    }
}
