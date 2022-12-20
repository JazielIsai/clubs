<?php

class ActivitiesClub extends MethodsCrud
{
    public function __construct() 
    {
        parent::__construct('clubs_itesi');
    }

    public function get_activities_by_club($id)
    {
        $query = 'SELECT COUNT(`nombre`) FROM `actividad` WHERE `id_club` = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_activities_in_progress_by_club($id)
    {
        //$query = 'SELECT `nombre` FROM `actividad` WHERE `estatus` = "Progreso";';
        $query = 'SELECT COUNT(`nombre`) FROM `actividad` WHERE `estatus` = "Progreso" AND `id_club` = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_uninitiated_activities_by_club($id)
    {
        $query = 'SELECT COUNT(`nombre`) FROM `actividad` WHERE `estatus` = "Sin Comenzar" AND `id_club` = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_activities_completed_by_club($id)
    {
        $query = 'SELECT COUNT(`nombre`) FROM `actividad` WHERE `estatus` = "Finzalizado" AND `id_club` = ?;';
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
        $query = 'SELECT motivo FROM incidencias INNER JOIN actividad ON incidencias.id_actividad = actividad.id AND actividad.id = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_number_of_incidents_by_activity($id)
    {
        $query = 'SELECT COUNT(motivo) FROM incidencias INNER JOIN actividad ON incidencias.id_actividad = actividad.id AND actividad.id = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_evidence_by_club($id)
    {
        $query = 'SELECT COUNT(evidencia.id) FROM evidencia INNER JOIN actividad ON evidencia.id_actividad = actividad.id AND actividad.id_club = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }

    public function get_skills_developed_by_club($id)
    {
        $query = 'SELECT habilidades.nombre FROM habilidades INNER JOIN actividad ON habilidades.id = actividad.id_habilidad_desarrollada AND actividad.id_club = ?;';
        $params = array($id);
        return $this->select_query($query, $params);
    }
}