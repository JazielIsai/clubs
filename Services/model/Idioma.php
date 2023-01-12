<?php
class Idioma extends MethodsCrud
{

    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_idioms(){
        $query="SELECT * FROM clubs_itesi.idioma;";
        return $this->select_query($query);
    }

    public function insert_a_new_language($language_name){

        $query = "INSERT INTO clubs_itesi.idioma(idioma)VALUES (?);";
        $query_data=array($language_name);
        return $this->insert_query($query,array($query_data));
    }

    public function update_language ($name_language, $id_language) {
        $query = "
            UPDATE clubs_itesi.idioma SET idioma = ?
            WHERE id = ?
        ";

        $params = array($name_language, $id_language);
        return $this->update_delete_query($query, array($params));
    }

    public function delete_language ($id_language) {
        $query = "
            DELETE FROM clubs_itesi.idioma WHERE id = ?;
        ";
        $params = array($id_language);

        return $this->update_delete_query($query, array($params));
    }

}
