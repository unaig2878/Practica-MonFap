<?php
require_once __DIR__ . "/conexion.php";


class Consultas
{

    public function getElemento($id)
    {
        $conexion = new Conexion();
        $consulta = "SELECT * FROM elementos WHERE id = :id";
        $query = $conexion->connection->prepare($consulta);
        //bindear 
        $query->bindParam(':id', $id);

        $query->execute();

        return $query->fetch(PDO::FETCH_ASSOC);
    }
    public function deleteElemento($id)
    {
        $conexion = new Conexion();
        $consulta = "DELETE FROM elementos WHERE id = :id";
        $query = $conexion->connection->prepare($consulta);

        $query->bindParam(':id', $id);

        $result = $this->getElemento($id);

        $query->execute();


        return $result;
    }
    public function createElemento($element_name, $element_description, $element_serial_number, $status1, $priority)
    {
        $conexion = new Conexion();
        $consulta = "INSERT INTO elementos (nombre, descripcion, nserie, estado, prioridad) VALUES (:element_name, :element_description, :element_serial_number, :status1, :priority)";
        $query = $conexion->connection->prepare($consulta);

        $query->bindParam(':element_name', $element_name);
        $query->bindParam(':element_description', $element_description);
        $query->bindParam(':element_serial_number', $element_serial_number);
        $query->bindParam(':status1', $status1);
        $query->bindParam(':priority', $priority);


        $query->execute();

        $lastInsertedId = $conexion->connection->lastInsertId();
        $result = $this->getElemento($lastInsertedId);


        return $result;

    }
    public function modifyElemento($id, $params)
    {
        $conexion = new Conexion();
        $consulta = "UPDATE elementos SET ";
        $paramquery = [];

        // Mapear array a base de datos
        $columnMapping = [
            'element_name' => 'nombre',
            'element_description' => 'descripcion',
            'element_serial_number' => 'nserie',
            'status' => 'estado',
            'priority' => 'prioridad',
        ];

        foreach ($params as $key => $value) {
            // Verificar que la clave sea valida en la base de datos
            if (array_key_exists($key, $columnMapping)) {
                //cambiar el nombre al de la columna
                $column = $columnMapping[$key];
                $paramquery[] = "$column = :$key";
            }
        }

        // Verificar que no esta vacio
        if (!empty($paramquery)) {
            $consulta .= implode(", ", $paramquery);
            $consulta .= " WHERE id = :id";

            $query = $conexion->connection->prepare($consulta);

            
            $query->bindParam(':id', $id, PDO::PARAM_INT);

            
            foreach ($params as $key => $value) {
                if (array_key_exists($key, $columnMapping)) {
                    //cambiar el nombre al de la columna
                    $column = $columnMapping[$key];
                    $query->bindParam(":$key", $params[$key]);
                }
            }

            try {
                $query->execute();


                $result = $this->getElemento($id);
                return $result;
            } catch (PDOException $e) {
                echo "Error de PDO: " . $e->getMessage();
                return false;
            }
        } else {
            return "No se proporcionaron columnas válidas para actualizar.";
        }
    }

    public function getAll()
    {
        $conexion = new Conexion();
        $consulta = "SELECT * FROM elementos";
        $query = $conexion->connection->prepare($consulta);
        
        $query->execute();
        
        $result[] = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

}