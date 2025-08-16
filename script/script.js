const API_URL = 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example';

const loadButton = document.getElementById('loadData');
const dataContainer = document.getElementById('dataContainer');

loadButton.addEventListener('click', cargarAPI);

function cargarAPI() {
    dataContainer.innerHTML = 'Cargando...';

    $.ajax({
        url: API_URL,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
            console.log('Respuesta:', data);
            mostrarResultado(data);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            dataContainer.innerHTML = 'Error: ' + error;
        }
    });
}

function mostrarResultado(data) {
    const mensaje = data.mensaje || 'Sin mensaje';
    dataContainer.innerHTML = `<h4>API Funcionando!</h4><p>Mensaje: ${mensaje}</p>`;
}