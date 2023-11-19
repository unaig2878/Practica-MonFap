function navbar() {
    let header = document.querySelector('header');

    fetch('./nav.html')
        .then(response => response.text())
        .then(function (navHtml) {
            header.innerHTML = navHtml;
            let nav = document.getElementById('nav');
            applyStyles(nav);
        })
        .catch(function (error) {
            console.error('Error during fetch operation:', error);
        });
}

function applyStyles(nav) {
    if (nav) {
        let currentURL = window.location.href;
        nav.style.display = 'flex';
        nav.style.justifyContent = 'space-between'; 
        nav.style.alignItems = 'center'; 
        nav.style.backgroundColor = 'blue';
        nav.style.padding = '10px';
        nav.style.color = '#fff';

        if (currentURL.endsWith('/Inicio.html')) {
            document.getElementById('home').style.color = 'red';
            document.getElementById('home').style.textDecoration = 'none';
        } else if (currentURL.endsWith('/Formulario.html')) {
            document.getElementById('form1').style.color = 'red';
        } else if (currentURL.endsWith('/Tabla.html')) {
            document.getElementById('table').style.color = 'red';
        }
    }
}

document.addEventListener('load', navbar());
    

