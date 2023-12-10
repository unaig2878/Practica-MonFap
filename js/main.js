
//let elements = [
//{ name: 'Sensor 1', description: 'Este sensor se dedica a...', serialNumber: 'SN001', status: 'Activo', priority: 'Alta' },
//{ name: '', description: 'este sensir se de dica a ser sensible 2', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
//{ name: 'Sensor 3', description: 'patata', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
//{ name: 'Sensor 4', description: 'este sensir se de dica a ser sensible 4', serialNumber: 'SN002', status: 'Inactivo', priority: 'Baja' },
//];
let elements = []; // Inicialmente vacío, se llenará con loadElements

function loadElements() {
    return fetch('./ws/consultas/getElement.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar elementos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from server:', data);
            if (data && data.success === true && Array.isArray(data.data) && data.data.length > 0) {
                console.log('Data array:', data.data[0]);
                return data.data[0];
            } else {
                console.error('Error al cargar elementos: Respuesta inesperada del servidor');
                throw new Error('Error al cargar elementos');
            }
        })
        .catch(error => {
            console.error('Error al cargar elementos:', error);
            throw error;
        });
}



function updateTable(elements) {
    // Obtén la referencia al tbody de la tabla
    let tbody = document.getElementById('tbody');
    tbody.innerHTML ='';

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
        cell1.innerHTML = element.nombre;
        cell2.innerHTML = element.descripcion;
        cell3.innerHTML = element.nserie;
        cell4.innerHTML = element.estado;
        cell5.innerHTML = element.prioridad;

        let rowId = 'row-' + (index + 1);
        row.id = rowId;


        cell6.innerHTML = '<button onclick="eliminar(event, \'' + rowId + '\')">X</button><button onclick="modificar(\'' + rowId + '\')">Modificar</button>';
    });
}

function eliminar(ev, rowId) {
    console.log(rowId);

    showConfirmation('eliminar', ev).then((confirmed) => {
        if (confirmed) {
            let row = document.getElementById(rowId);
            let tbody = document.getElementById('tbody');

            if (row && row.parentNode === tbody) {
                let rowId1 = row.id;
                let rowId2 = rowId1.substring(4);
                console.log(rowId2);

                // Realizar LLamada
                fetch('./ws/consultas/deleteElement.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    },
                    //Enviamos solo el id por que es lo unico que se necesita
                    body: 'id=' + rowId2, 
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al eliminar el elemento');
                        }
                        return response.text();
                    })
                    .then(data => {
                        console.log('Response from deleteElement:', data);
                        //que no este vacio
                        if (data.trim() !== '') {
                            // MMostrar Sweelalert con la respuesta del php
                            if (data.includes('success') && JSON.parse(data).success) {
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: 'El elemento se eliminó correctamente.',
                                    icon: 'success',
                                });
                                row.remove();
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Error al eliminar el elemento.',
                                    icon: 'error',
                                });
                            }
                        } else {
                            console.error('Error during deleteElement fetch: Empty response');
                        }
                    })
                    .catch(error => {
                        console.error('Error durante la eliminación del elemento:', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Error durante la eliminación del elemento.',
                            icon: 'error',
                        });
                    });
            } else {
                console.error('La fila con el ID ' + rowId + ' no fue encontrada en el tbody.');
            }
        }
    });
}
function crearFormulario(rowId1) {
    let container = document.getElementById('container');
    return new Promise((resolve, reject) => {
        fetch('./formBluePrint.html')
            .then(response => response.text())
            .then(formHtml => {
                container.innerHTML = formHtml;
                let botonGuardar = document.getElementById('botonGuardar');


                botonGuardar.addEventListener('click', function (event) {
                    showConfirmation('modificar', event).then(() => {
                        guardarDatos(event, rowId1);
                    });
                });

                resolve();
            })
            .catch(error => {
                console.error('Error during fetch operation:', error);
                reject(error);
            });
    });
}

function guardarDatos(event,rowId1) {
    event.preventDefault();

    let elementName = document.getElementById('element_name').value;
    let elementDescription = document.getElementById('element_description').value;
    let elementSerialNumber = document.getElementById('element_serial_number').value;
    let statusElement = document.querySelector('input[name="status"]:checked');
    let priorityElement = document.querySelector('input[name="priority"]:checked');

    let status1 = statusElement ? statusElement.id : null;
    let priority1 = priorityElement ? priorityElement.id : null;

    let rowId2 = rowId1.substring(4);
    // Mapeo a las BD
    const keyMapping = {
        rowId2:'id',
        element_name: 'nombre',
        element_description: 'descripcion',
        element_serial_number: 'nserie',
        status1: 'estado',
        priority1: 'prioridad'
    };

    //Meter los datos en un FormData
    let formData = new FormData();
    formData.append('id', rowId2);
    formData.append('element_name', elementName);
    formData.append('element_description', elementDescription);
    formData.append('element_serial_number', elementSerialNumber);
    formData.append('status', status1);
    formData.append('priority', priority1);

    for (let pair of formData.entries()) {
        let [key, value] = pair;
        // Verificar si esta en el mapeo
        if (keyMapping[key]) {
            formData.delete(key);
            formData.append(keyMapping[key], value);
        }
    }
    console.log(formData);

    fetch('./ws/consultas/modifyElements.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error during modifyElement fetch: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
+        console.log('Response from modifyElement:', data);

        // Actualizar la tabla
        updateTable(elements);
    })
    .catch(error => {
        console.error('Error during modifyElement fetch:', error);
    });
}

function createElement2(event) {
    event.preventDefault();

    let elementName = document.getElementById('element_name').value;
    let elementDescription = document.getElementById('element_description').value;
    let elementSerialNumber = document.getElementById('element_serial_number').value;
    let statusElement = document.querySelector('input[name="status"]:checked');
    let priorityElement = document.querySelector('input[name="priority"]:checked');

    let status1 = statusElement ? statusElement.id : null;
    let priority1 = priorityElement ? priorityElement.id : null;

    const requestData = {
        element_name: elementName,
        element_description: elementDescription,
        element_serial_number: elementSerialNumber,
        status: status1,
        priority: priority1
    };

    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez enviado, no podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, enviarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('./ws/consultas/createElement2.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error during createElement fetch: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('Response from createElement:', data);
                Swal.fire({
                    title: '¡Correcto!',
                    text: 'El elemento se ha creado correctamente.',
                    icon: 'success',
                });
            })
            .catch(error => {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Hubo un error al crear el elemento.',
                    icon: 'error',
                });

                console.error('Error during createElement fetch:', error);
            });
        }
    });
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

                if (statusValue === 'Active') {
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

function guardarDatos1(event, rowId1) {
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

function showConfirmation(accion, event) {
    event.preventDefault();

    return new Promise((resolve) => {
        let confirmText, successText, confirmButtonText;

        switch (accion) {
            case 'eliminar':
                confirmText = "¿Estás seguro de eliminar?";
                successText = "¡Eliminado!";
                break;
            case 'crear':
                confirmText = "¿Estás seguro de crear?";
                successText = "¡Creado!";
                break;
            case 'modificar':
                confirmText = "¿Estas seguro de modificar?";
                successText = "¡Modificado!";
                break;

            default:
                break;
        }

        confirmButtonText = "Sí, " + accion;

        Swal.fire({
            title: confirmText,
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: successText,
                    text: "La operación se realizó con éxito.",
                    icon: "success"
                });
                if (accion === 'crear') {
                    document.getElementById("form").submit();
                }
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('Tabla.html')) {
        loadElements()
            .then(loadedElements => {
                elements = loadedElements;
                updateTable(elements);
            })
            .catch(error => {
                console.error('Error al cargar elementos:', error);
            });
    }
});
