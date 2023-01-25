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

    public function get_public_activities()
    {
        $query = "SELECT actividad.nombre, actividad.modalidad, actividad.fecha, clubes.name as club
                    FROM actividad INNER JOIN clubes ON actividad.id_club = clubes.id
                    AND actividad.dominio LIKE 'Público';";

        return $this->select_query($query);
    }

    public function get_count_activities_public ()
    {
        $query = "SELECT COUNT(*) count_activities_public FROM actividad WHERE dominio LIKE 'Público';";
        return $this->select_query($query);
    }

    public function get_activities_by_id_club($id)
    {
        $query = "SELECT COUNT(nombre) FROM actividad WHERE id_club = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_activities_in_progress_by_club($id)
    {
        //$query = 'SELECT `nombre` FROM `actividad` WHERE `estatus` = "Progreso";';
        $query = "SELECT COUNT(nombre) FROM actividad WHERE estatus = 'Progreso' AND id_club = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_uninitiated_activities_by_club($id)
    {
        $query = "SELECT COUNT(`nombre`) FROM `actividad` WHERE `estatus` = 'Sin Comenzar' AND `id_club` = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_activities_completed_by_club($id)
    {
        $query = "SELECT COUNT(`nombre`) FROM `actividad` WHERE `estatus` = 'Finzalizado' AND `id_club` = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_activities_per_semester_by_club($f_inicio, $f_final, $id)
    {
        $query = "SELECT COUNT(fecha) FROM actividad WHERE fecha > '?' AND fecha < '?' AND `id_club` = ?;";
        $params = array($f_inicio, $f_final, $id);
        return $this->select_query($query, $params);
    }

    public function get_incidents_by_activity($id)
    {
        $query = "SELECT motivo FROM incidencias INNER JOIN actividad ON incidencias.id_actividad = actividad.id AND actividad.id = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_number_of_incidents_by_activity($id)
    {
        $query = "SELECT COUNT(motivo) FROM incidencias INNER JOIN actividad ON incidencias.id_actividad = actividad.id AND actividad.id = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_evidence_by_club($id)
    {
        $query = "SELECT COUNT(evidencia.id) FROM evidencia INNER JOIN actividad ON evidencia.id_actividad = actividad.id AND actividad.id_club = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_skills_developed_by_club($id)
    {
        $query = "SELECT habilidades.nombre FROM habilidades INNER JOIN actividad ON habilidades.id = actividad.id_habilidad_desarrollada AND actividad.id_club = ?;";
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function update_status_of_activity($user_info)
    {
        $query = "UPDATE `actividad` SET `estatus`=? WHERE id = ?;";

        $data = array($user_info->estatus, $user_info->id);

        return $this->update_delete_query($query, array($data));
    }
}