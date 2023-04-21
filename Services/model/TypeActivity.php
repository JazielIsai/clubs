<?php

class TypeActivity extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_type_activity () {
        $query = "
            SELECT * FROM tipo_actividad;
        ";

        return $this->select_query($query);
    }

    public function add_type_activity($name_activity)
    {
        echo "name".$name_activity;

        $query = "
            INSERT INTO tipo_actividad(nombre) VALUES (?);
            ";
        return $this->insert_query($query, array(array($name_activity)));
    }

    public function delete_type_activity($id_type_activity)
    {
        $query = "DELETE FROM tipo_actividad WHERE id = ?";

        $data = array($id_type_activity);

        return $this->update_delete_query($query, array($data));
    }

    public function update_type_activity($activity_info)
    {
        $query = "
            UPDATE tipo_actividad SET nombre = ?
            WHERE id = ?";

        $data = array($activity_info->nombre,
                      $activity_info->id);
        return $this->update_delete_query($query, array($data));
    }

}