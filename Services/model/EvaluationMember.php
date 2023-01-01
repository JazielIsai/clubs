<?php

class EvaluationMember extends MethodsCrud {

    public function __construct() {
        parent::__construct('clubs_itesi');
    }

    public function get_evaluation_member_by_activity ($id_activity) {
        $query = "
            SELECT * FROM evaluacion_miembro WHERE id_actividad = ?;
        ";

        $params = array($id_activity);

        return $this->select_query($query, $params);
    }

    public function get_evaluation_member ($id_activity) {
        $query = "
            SELECT CONCAT(miembros_club.nombre, ' ', miembros_club.apellido_paterno) AS nombre_miembro,
                   evaluacion_miembro.id, evaluacion_miembro.observaciones,
                   evaluacion_miembro.hab_desarrollada, evaluacion_miembro.competencia_conocer,
                   evaluacion_miembro.calificacion, evaluacion_miembro.id_miembro,
                   evaluacion_miembro.id_actividad,
                   actividad.nombre AS nombre_actividad
            FROM evaluacion_miembro
            RIGHT JOIN miembros_club ON miembros_club.id = evaluacion_miembro.id_miembro
            INNER JOIN actividad ON actividad.id = evaluacion_miembro.id_actividad
            WHERE evaluacion_miembro.id_actividad = ?;
        ";

        $params = array($id_activity);

        return $this->select_query($query, $params);
    }

    public function add_evaluation_member_by_activity ($evaluation_member_info) {

        if ( count($this->get_evaluation_member_by_activity($evaluation_member_info->id_actividad)) > 0 ) {
            return 'Evaluation member already exists.';
        }

        $query = "
            INSERT INTO evaluacion_miembro (id_actividad, id_miembro)
            SELECT ?, miembros_club.id FROM miembros_club
            WHERE miembros_club.id_club = ?;
        ";

        $params = array(
            $evaluation_member_info->id_actividad,
            $evaluation_member_info->id_club
        );

        return $this->insert_query($query, array($params));
    }

    public function update_evaluation_member_by_activity ($evaluation_member_info) {
        $query = "
            UPDATE evaluacion_miembro SET observaciones = ?, hab_desarrollada = ?, competencia_conocer = ?, calificacion = ?
            WHERE id = ?;
        ";

        $params = array(
                $evaluation_member_info->observaciones,
                $evaluation_member_info->hab_desarrollada,
                $evaluation_member_info->competencia_conocer,
                $evaluation_member_info->calificacion,
                $evaluation_member_info->id
        );

        return $this->update_delete_query($query, array($params));
    }




}