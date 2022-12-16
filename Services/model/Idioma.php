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

    public function insert_a_new_idioma($idioma_data){

        $query = "INSERT INTO clubs_itesi.idioma(idioma)VALUES (?);";
        $query_data=array($idioma_data->idioma);
        return $this->insert_query($query,array($query_data));
    }

}
