<?php

require_once 'models/Element.php';

// Verificar si se ha enviado el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $elementName = $_POST['element_name'];
    $elementDescription = $_POST['element_description'];
    $elementSerialNumber = $_POST['element_serial_number'];
    $status = $_POST['status'];
    $priority = $_POST['priority'];
} else {
    return 'Ha habido un error al enviar el formulario';
}

// instancia de clase Elements
$element = new Element($elementName, $elementDescription, $elementSerialNumber, $status, $priority);

// Metemr el JSON en una variable
$elementJson = $element->toJson();

// Almacenar los datos en un txt
$fileName = 'C:\xampp\htdocs\DWC\MonFap\almacenar\Elements.txt';
file_put_contents($fileName, $elementJson . PHP_EOL, FILE_APPEND);

// Mostrar por pantalla
echo $elementJson;


?>