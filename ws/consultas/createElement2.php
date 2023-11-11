<?php
require_once ".././models/Element.php";

// Obtener el contenido del json
$jsonData = file_get_contents('php://input');

// Decodificar el JSON 
$data = json_decode($jsonData, true);

if (isset($data['element_name'], $data['element_description'], $data['element_serial_number'], $data['status'], $data['priority'])) {
    $name = $data['element_name'];
    $description = $data['element_description'];
    $serial = $data['element_serial_number'];
    $status1 = $data['status'];
    $priority = $data['priority'];
    
    


    $elem = Element::createElem( $name,$description, $serial, $status1, $priority);
    echo $elem;
} else {
    echo json_encode(['error' => 'Campos faltantes en el JSON.']);
}

