<?php
class Habilidades extends MethodsCrud {

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_skills(){

        $query="SELECT * FROM clubs_itesi.habilidades;";
        return $this->select_query($query);
    }

    public function insert_a_new_skill($skill_data){

            $query = "INSERT INTO clubs_itesi.habilidades(nombre)VALUES (?);";
            $query_data=array($skill_data);
            return $this->insert_query($query,array($query_data));
    }

    public function update_skill ($name_skill, $id_skill) {
        $query = "
            UPDATE habilidades SET nombre = ?
            WHERE id = ?
        ";

        $params = array($name_skill, $id_skill);
        return $this->update_delete_query($query, array($params));
    }

    public function delete_skill ($id_skill) {
        $query = "
            DELETE FROM habilidades WHERE id = ?;
        ";
        $params = array($id_skill);

        return $this->update_delete_query($query, array($params));
    }



}