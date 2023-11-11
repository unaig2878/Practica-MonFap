<?php
require_once ".././models/Element.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];

    $elem = Element::deleteById( $id);

    echo $elem;
}