const API_URL = 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example';

const loadButton = document.getElementById('loadData');
const dataContainer = document.getElementById('dataContainer');

loadButton.addEventListener('click', cargarAPI);

function cargarAPI() {
    dataContainer.innerHTML = 'Cargando...';

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta:', data);
            mostrarResultado(data);
        })
        .catch(error => {
            console.error('Error:', error);
            dataContainer.innerHTML = 'Error al cargar';
        });
}

function mostrarResultado(data) {
    const mensaje = data.mensaje;
    dataContainer.innerHTML = `<h4>API Funcionando!</h4><p>Mensaje: ${mensaje}</p>`;
}