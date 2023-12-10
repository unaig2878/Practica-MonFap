<?php
require_once ".././models/Element.php";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $elem = Element::deleteById( $id);

    echo $elem;
}