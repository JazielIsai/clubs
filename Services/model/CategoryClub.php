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

}