<?php
require_once ".././models/Element.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Obtén el elemento por su ID
        $elem = Element::getByID($id);
        echo $elem;
    } else {
        $elem = Element::getAll();
        echo $elem;
    }
}