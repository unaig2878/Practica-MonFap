/*const elements = [];

function formSubmit() {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const name = document.getElementById('element_name').value;
        const description = document.getElementById('element_description').value;
        const serialNumber = document.getElementById('element_serial_number').value;
        const status = document.getElementById('active').checked ? 'active' : 'inactive';
        const priority = document.getElementById('high').checked ? 'high' : (document.getElementById('medium').checked ? 'medium' : 'low');

        // Creamos el objeto 
        const newInput = {
            name: name,
            description: description,
            serialNumber: serialNumber,
            status: status,
            priority: priority
        };

        // Hacemos push del objeto al array
        elements.push(newInput);

        // Mostramos el array
        console.log(elements);
        //llamamos a la funcion que rellena los campos
        updateTable(elements);
    });
}*/

var elements = [
    { name: 'Sensor 1', description: 'Este sensor se dedica a...', serialNumber: 'SN001', status: 'Activo', priority: 'Alta' },
    { name: 'Sensor 2', description: 'este sensir se de dica a ser sensible 2', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
    // Agrega más objetos según sea necesario
];

window.onload = function () {
    updateTable(elements);
};

function updateTable(elements) {
    // Obtén la referencia al tbody de la tabla
    var tbody = document.getElementById('tbody');

    // Itera sobre el array e inserta cada objeto en una fila de la tabla
    elements.forEach(function (element) {
        var row = tbody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        // Asigna los valores del objeto a las celdas de la fila
        cell1.innerHTML = element.name;
        cell2.innerHTML = element.description;
        cell3.innerHTML = element.serialNumber;
        cell4.innerHTML = element.status;
        cell5.innerHTML = element.priority;
        cell6.innerHTML = '<button onclick="eliminar()">X</button>';
    });
}


function eliminar(index) {
    // Elimina la fila correspondiente al índice
    var tbody = document.getElementById('tbody');
    tbody.deleteRow(index);
}

function filtrarTabla() {
    //valor del input
    var input = document.getElementById('Filtrar');
    //se cambia a mayusculas para compararlo sin problemas
    var filter = input.value.toUpperCase();
    //otenemos la tabla al completo
    var table = document.getElementById('elementTable');
    //obtenemos todas las filas
    var rows = table.getElementsByTagName('tr');

    
    // Solo inicia el filtrado cuando hay al menos 3 caracteres
    if (filter.length >= 3) {
        //Iteramos para crear referencias directas
        for (var i = 0; i < rows.length; i++) {
            var nameCol = rows[i].getElementsByTagName('td')[0];
            var descriptionCol = rows[i].getElementsByTagName('td')[1];

            //Verificar si hay al menos una de las columnas
            if (nameCol || descriptionCol) {
                //pasamos las referencias directas a texto
                var nameText = nameCol.textContent;
                var descriptionText = descriptionCol.textContent;

                //buscamos coincidencias 
                var matchName = nameText.toUpperCase().includes(filter);
                var matchDescription = descriptionText.toUpperCase().includes(filter);

                //si en alguna de las 2 hay coincidencias
                if (matchName || matchDescription) {
                    // Resalta los resultados en la tabla
                    resaltarCoincidencias(nameCol, matchName);
                    resaltarCoincidencias(descriptionCol, matchDescription);
                }
            }
        }
    }
}



function resaltarCoincidencias(cell, isMatch) {
    // Resalta la celda si hay coincidencia
    if (isMatch) {
        cell.style.backgroundColor = 'yellow';
    }
}


