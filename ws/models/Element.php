<?php
require_once 'c:\xampp\htdocs\DWC\MonFap\ws\interfaces\ToJson.php';
require_once '../../clases/consultas.php';
class Element implements IToJson   {
    public $consultas;
    private $id;
    public $element_name;

    public $element_description;

    public $element_serial_number;

    public $status1;

    public $priority;
    
   
    public function __construct($id, $name, $description, $serial, $status1, $priority) {
        $this->id = $id;
        $this->element_name = $name;
        $this->element_description = $description;
        $this->element_serial_number = $serial;
        $this->status1 = $status1;
        $this->priority = $priority;
        $this->consultas = new Consultas();
    }
     /*Consultas a la base de datos*/
     
     public static function getByID($id){
        $consultas = new Consultas();
        $info = $consultas->getElemento($id);
        $valor = 'Elemento obtenido correctamente';
        $createdElementData = Element::mostrar($info, $valor);
        return json_encode($createdElementData);
     }
     public static function getAll(){
        $consultas = new Consultas();
        $info = $consultas->getAll();
        $valor = 'Elemento no ha sido insertado';
        $createdElementData = Element::mostrar($info, $valor);
        return json_encode($createdElementData);
     }
     

     public static function createElem($element_name, $element_description, $element_serial_number, $status1, $priority ) {
        $consultas = new Consultas();
        $info = $consultas->createElemento($element_name, $element_description, $element_serial_number, $status1, $priority);
        
        $valor = 'Elemento creado correctamente';
        $createdElementData = Element::mostrar($info, $valor);
        return json_encode($createdElementData);
     }

     public static function deleteById($id) {
        $consultas = new Consultas();
        $info = $consultas->deleteElemento($id);

        $valor = 'Elemento eliminado correctamente';
        $createdElementData = Element::mostrar($info, $valor);
        return json_encode($createdElementData);
     }

     
     public static function mostrar($info, $valor){
        if ($info) {
            $createdElementData = [
                'success' => true,
                'message' => $valor,
                'data' => $info 
            ];
        } else {
            $createdElementData = [
                'success' => false,
                'message' => 'Error al modificar el elemento (Asegurate que exista y hayas rellenado todos los parametros)',
                'data' => null
            ];
        }
        return $createdElementData;
     }

    public static function modifyById($id, $params) {
        $consultas = new Consultas();

        $info = $consultas->modifyElemento($id,$params);
        $valor = 'Elemento modificado correctamente';
        $createdElementData = Element::mostrar($info, $valor);
         
        
        return json_encode($createdElementData);
    }

    public function toJson() {
        return json_encode([
            'element_name' => $this->element_name,
            'element_description' => $this->element_description,
            'element_serial_number' => $this->element_serial_number,
            'status' => $this->status1,
            'priority' => $this->priority,
        ]);
    }

    
    public function getElementName() {
        return $this->element_name;
    }

    public function setElementName($element_name) {
        $this->element_name = $element_name;
    }
    
    public function getElementDescription() {
        return $this->element_description;
    }
    
    public function setElementDescription($element_description) {
        $this->element_description = $element_description;
    }
    
    public function getElementSerialNumber() {
        return $this->element_serial_number;
    }
    
    public function setElementSerialNumber($element_serial_number) {
        $this->element_serial_number = $element_serial_number;
    }
    
    public function status1() {
        return $this->status1;
    }
    
    
    public function getPriority() {
        return $this->priority;
    }
    
    public function setPriority($priority) {
        $this->priority = $priority;
    }
}