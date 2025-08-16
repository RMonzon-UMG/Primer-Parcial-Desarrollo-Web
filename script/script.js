const API_URL = 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example';

const loadButton = document.getElementById('loadData');
const dataContainer = document.getElementById('dataContainer');

loadButton.addEventListener('click', cargarAPI);

function cargarAPI() {
    dataContainer.innerHTML = '<div class="col-12"><p>Cargando...</p></div>';

    fetch(API_URL, {
        mode: 'cors',
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta:', data);
            mostrarResultado(data);
        })
        .catch(error => {
            console.error('Error:', error);
            dataContainer.innerHTML = `
            <div class="col-12">
                <div>
                    <h4>Error CORS</h4>
                    <p>El API no permite acceso desde archivos locales.</p>
                    <p>Necesitas usar un servidor local o Live Server.</p>
                </div>
            </div>
        `;
        });
}

function mostrarResultado(data) {
    const mensaje = data.mensaje || 'Sin mensaje';

    dataContainer.innerHTML = `
        <div class="col-12">
            <div style="background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px;">
                <h4>API Funcionando!</h4>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            </div>
        </div>
    `;
}