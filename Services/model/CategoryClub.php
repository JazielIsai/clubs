<?php

class CategoryClub extends MethodsCrud {
    public function __construct()
    {
        parent::__construct('clubs_itesi');
    }

    public function get_all_category_to_club () {
        $query = "SELECT * FROM categoria_club";
        return $this->select_query($query);
    }

    public function add_category_to_club ($name_category) {
        $query = "
            INSERT INTO categoria_club (nombre)
            VALUES (?);
        ";
        $params = array($name_category);

        return $this->insert_query($query, array($params));
    }

    public function update_category_to_club ($name_category, $id_category) {
        $query = "
            UPDATE categoria_club SET nombre = ?
            WHERE id = ?
        ";

        $params = array($name_category, $id_category);
        return $this->update_delete_query($query, array($params));
    }

    public function delete_category_to_club ($id_category) {
        $query = "
            DELETE FROM categoria_club WHERE id = ?;
        ";
        $params = array($id_category);

        return $this->update_delete_query($query, array($params));
    }

}