<?php
require_once 'C:\xampp\htdocs\DWC\MonFap\ws\interfaces\ToJson.php';

class Element implements IToJson   {
    /** @var string El nombre */
    public $element_name;

    /** @var string La descripción */
    public $element_description;

    /** @var string El numero de serie */
    public $element_serial_number;

    /** @var bool Estado (activo/inactivo) */
    public $active;

    /** @var string Prioridad (alta/media/baja) */
    public $priority;

    /**
     * Constructor de la clase Element.
     *
     * @param string $name   
     * @param string $description  
     * @param string $serial     
     * @param bool   $isActive  
     * @param string $priority   
     */
    public function __construct($name, $description, $serial, $isActive, $priority) {
        $this->element_name = $name;
        $this->element_description = $description;
        $this->element_serial_number = $serial;
        $this->active = $isActive;
        $this->priority = $priority;
    }
     /**
     * Convierte la instancia a JSON.
     *
     * @return string 
     */

    public function toJson() {
        return json_encode([
            'element_name' => $this->element_name,
            'element_description' => $this->element_description,
            'element_serial_number' => $this->element_serial_number,
            'active' => $this->active,
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
    
    public function isActive() {
        return $this->active;
    }
    
    public function setActive($active) {
        $this->active = $active;
    }
    
    public function getPriority() {
        return $this->priority;
    }
    
    public function setPriority($priority) {
        $this->priority = $priority;
    }
}