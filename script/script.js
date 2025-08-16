const API_URL = 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example';

$(document).ready(function () {
    cargarDatosFormulario();
    cargarColorFondo();

    $('#btnBienvenida').click(function () {
        alert('¡Bienvenido al perfil de Ronaldo Monzón!');
    });

    $('#btnCambiarColor').click(function () {
        const colores = ['#e3f2fd', '#f3e5f5', '#e8f5e8', '#fff3e0', '#ffebee'];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        $('body').css('background-color', colorAleatorio);

        localStorage.setItem('colorFondo', colorAleatorio);
    });

    $('#btnAgregarHabilidad').click(function () {
        const nuevaHabilidad = $('#inputHabilidad').val().trim();
        if (nuevaHabilidad) {
            $('.list-group-flush').append(`<li class="list-group-item">${nuevaHabilidad}</li>`);
            $('#inputHabilidad').val('');
        } else {
            alert('Por favor, ingresa una habilidad válida');
        }
    });

    $('#contactForm').submit(function (e) {
        e.preventDefault();

        const nombre = $('#nombre').val().trim();
        const email = $('#email').val().trim();
        const mensaje = $('#mensaje').val().trim();
        let errores = [];

        if (!nombre) errores.push('El nombre es obligatorio');
        if (!email) errores.push('El email es obligatorio');
        if (!mensaje) errores.push('El mensaje es obligatorio');

        if (errores.length > 0) {
            $('#errorFormulario').html(`
                <div class="alert alert-danger">
                    <strong>Errores:</strong>
                    <ul class="mb-0">
                        ${errores.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
            `);
        } else {
            guardarDatosFormulario();

            $('#errorFormulario').html(`
                <div class="alert alert-success">
                    ¡Formulario enviado correctamente!
                </div>
            `);

            setTimeout(() => {
                $(this)[0].reset();
                $('#errorFormulario').html('');
            }, 2000);
        }
    });

    $('#btnCambiarTexto').click(function () {
        const textos = [
            'Soy un desarrollador apasionado por la tecnología.',
            'Me especializo en desarrollo web frontend y backend.',
            'Siempre busco aprender nuevas tecnologías.',
            'Mi objetivo es crear soluciones innovadoras.',
            'Trabajo con HTML, CSS, JavaScript y frameworks modernos.'
        ];

        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
        $('#textoVariable').text(textoAleatorio);
    });

    $('#loadData').click(cargarAPI);
    $('#btnRestablecerColor').click(function () {
        $('body').css('background-color', '#f0f0f0');
        localStorage.removeItem('colorFondo');
    });
});

function cargarAPI() {
    $('#dataContainer').html(`
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `);

    $.ajax({
        url: API_URL,
        method: 'GET',
        success: function (data) {
            console.log('Respuesta:', data);
            mostrarResultado(data);
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            $('#dataContainer').html(`
                <div class="alert alert-danger">
                    <strong>Error:</strong> No se pudo cargar la información de la API.
                </div>
            `);
        }
    });
}

function mostrarResultado(data) {
    const mensaje = data.mensaje;
    $('#dataContainer').html(`
        <div class="card border-success">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">🚀 API Funcionando!</h5>
            </div>
            <div class="card-body">
                <p class="card-text"><strong>Mensaje:</strong> ${mensaje}</p>
                <small class="text-muted">Datos cargados exitosamente desde la API</small>
            </div>
        </div>
    `);
}

function guardarDatosFormulario() {
    const datosFormulario = {
        nombre: $('#nombre').val(),
        email: $('#email').val(),
        mensaje: $('#mensaje').val()
    };
    localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));
}

function cargarDatosFormulario() {
    const datos = localStorage.getItem('datosFormulario');
    if (datos) {
        const datosFormulario = JSON.parse(datos);
        $('#nombre').val(datosFormulario.nombre || '');
        $('#email').val(datosFormulario.email || '');
        $('#mensaje').val(datosFormulario.mensaje || '');
    }
}

function cargarColorFondo() {
    const colorGuardado = localStorage.getItem('colorFondo');
    if (colorGuardado) {
        $('body').css('background-color', colorGuardado);
    }
}