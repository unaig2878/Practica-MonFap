
let elements = [
    { name: 'Sensor 1', description: 'Este sensor se dedica a...', serialNumber: 'SN001', status: 'Activo', priority: 'Alta' },
    { name: '', description: 'este sensir se de dica a ser sensible 2', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
    { name: 'Sensor 3', description: 'patata', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
    { name: 'Sensor 4', description: 'este sensir se de dica a ser sensible 4', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
];



function updateTable(elements) {
    // Obtén la referencia al tbody de la tabla
    let tbody = document.getElementById('tbody');

    // Itera sobre el array e inserta cada objeto en una fila de la tabla
    elements.forEach(function (element, index) {
        let row = tbody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        // Asigna los valores del objeto a las celdas de la fila
        cell1.innerHTML = element.name;
        cell2.innerHTML = element.description;
        cell3.innerHTML = element.serialNumber;
        cell4.innerHTML = element.status;
        cell5.innerHTML = element.priority;

        let rowId = 'row-' + (index + 1);
        row.id = rowId;


        cell6.innerHTML = '<button onclick="eliminar(\'' + rowId + '\')">X</button><button onclick="modificar(\'' + rowId + '\')">Modificar</button>';
    });
}


function eliminar(rowId) {

    console.log(rowId);

    let row = document.getElementById(rowId);
    let tbody = document.getElementById('tbody');

    if (row && row.parentNode === tbody) {
        row.remove();
    } else {
        console.error('La fila con el ID ' + rowId + ' no fue encontrada en el tbody.');
    }
}

function modificar(rowId) {
    let tbody = document.getElementById('tbody');
    let row = document.getElementById(rowId);

    if (row && row.parentNode === tbody) {
        let rowId1 = row.id;
        console.log(rowId1);
        let cells = row.getElementsByTagName('td');

        let nameValue = cells[0].textContent;
        let descriptionValue = cells[1].textContent;
        let serialNumberValue = cells[2].textContent;
        let statusValue = cells[3].textContent;
        let priorityValue = cells[4].textContent;

        console.log('Status Value:', statusValue);
        console.log('Priority Value:', priorityValue);


        crearFormulario(rowId1).then(() => {
            //recogemos los valores (inputs) del formulario
            let elementNameInput = document.getElementById('element_name');
            let elementDescriptionInput = document.getElementById('element_description');
            let elementSerialNumberInput = document.getElementById('element_serial_number');
            let activeCheckbox = document.getElementById('active');
            let inactiveCheckbox = document.getElementById('inactive');
            let highRadio = document.getElementById('high');
            let mediumRadio = document.getElementById('medium');
            let lowRadio = document.getElementById('low');

            //si los inputs existen les metemos los valores guardados previamente
            if (elementNameInput && elementDescriptionInput && elementSerialNumberInput &&
                activeCheckbox && inactiveCheckbox && highRadio && mediumRadio && lowRadio) {
                elementNameInput.value = nameValue;
                elementDescriptionInput.value = descriptionValue;
                elementSerialNumberInput.value = serialNumberValue;

                if (statusValue === 'Activo') {
                    activeCheckbox.checked = true;
                } else if (statusValue === 'Inactivo') {
                    inactiveCheckbox.checked = true;
                }

                if (priorityValue === 'Alta') {
                    highRadio.checked = true;
                } else if (priorityValue === 'Media') {
                    mediumRadio.checked = true;
                } else if (priorityValue === 'Baja') {
                    lowRadio.checked = true;
                }
            }
        });

    } else {
        console.error('La fila con el ID ' + rowId + ' no fue encontrada en el tbody.');
    }
}

//crearformulario
function crearFormulario(rowId1) {
    let container = document.getElementById('container');
    return new Promise((resolve, reject) => {
        fetch('./formBluePrint.html')
            .then(response => response.text())
            .then(formHtml => {
                container.innerHTML = formHtml;
                let botonGuardar = document.getElementById('botonGuardar');


                botonGuardar.addEventListener('click', function (event) {
                    guardarDatos(event, rowId1);
                });

                resolve();
            })
            .catch(error => {
                console.error('Error during fetch operation:', error);
                reject(error);
            });
    });
}

function guardarDatos(event, rowId1) {
    event.preventDefault();
    let elementName = document.getElementById('element_name').value;
    let elementDescription = document.getElementById('element_description').value;
    let elementSerialNumber = document.getElementById('element_serial_number').value;
    let status1 = document.querySelector('input[name="status"]:checked').id;
    let priority1 = document.querySelector('input[name="priority"]:checked').id;


    let tbody = document.getElementById('tbody');

    if (rowId1) {
        console.log('id ' + rowId1);

        let existingRow = tbody.querySelector('#' + rowId1);

        if (existingRow) {
            existingRow.cells[0].innerHTML = elementName;
            existingRow.cells[1].innerHTML = elementDescription;
            existingRow.cells[2].innerHTML = elementSerialNumber;
            existingRow.cells[3].innerHTML = status1;
            existingRow.cells[4].innerHTML = priority1;

            mostrarVideo();
        } else {
            console.error('La fila con el ID ' + rowId1 + ' no fue encontrada en el tbody.');
        }
    }

}

function mostrarVideo() {
    let container = document.getElementById('container');
    let body = document.querySelector('body');

    container.innerHTML = '';

    let iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    container.appendChild(iframe);

    let closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar Video';
    container.appendChild(closeButton);
    closeButton.addEventListener('click', function () {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, close it!"
        }).then((result) => {
            if (result.isConfirmed) {
                document.addEventListener('mousemove', bloquearRaton);

                if (!container) {
                    container = document.createElement('div');
                    document.body.appendChild(container);
                }
    
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.top = '0';
                container.style.left = '0';
                container.style.position = 'fixed';
    
                iframe.style.position = 'absolute';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.pointerEvents = 'none';
    
                container.innerHTML = '';
                container.appendChild(iframe);
    
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    });
}
    







//Filtrar
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
document.addEventListener('DOMContentLoaded', function () {
    updateTable(elements);
});  

function bloquearRaton(e) {
    e.preventDefault();
  }