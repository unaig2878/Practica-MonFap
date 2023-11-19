<?php
require_once ".././models/Element.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id = $_GET['id'];

    //Array asociativo con los parámetros
    $paramNames = [
        'element_name' => null,
        'element_description' => null,
        'element_serial_number' => null,
        'status' => null,
        'priority' => null,
    ];

    // obtener solo las claves coincidentes
    $params = array_intersect_key($_GET, $paramNames);

    
    //$params['id'] = $id;

    
    $elem = Element::modifyById($id, $params);

    echo $elem;

}