const API_KEY = '780b8d0700msh27e0696c715aef3p1cdafdjsnb636122a2b78';
const API_HOST = 'pizza-and-desserts.p.rapidapi.com';
const API_URL = 'https://pizza-and-desserts.p.rapidapi.com/pizzas';

// DOM Elements
const loadButton = document.getElementById('loadData');
const loadingSpinner = document.getElementById('loadingSpinner');
const dataContainer = document.getElementById('dataContainer');

// Event Listeners
loadButton.addEventListener('click', loadPizzaData);
document.addEventListener('DOMContentLoaded', loadPizzaData);


async function loadPizzaData() {
    showLoading(true);
    dataContainer.innerHTML = '';

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        displayData(data);
    } catch (error) {
        console.error('Error:', error);
        showError('Error al cargar las pizzas');
    } finally {
        showLoading(false);
    }
}


function displayData(data) {
    let pizzas = [];
    
    if (Array.isArray(data)) {
        pizzas = data.slice(0, 6);
    } else {
        pizzas = [data];
    }

    pizzas.forEach((pizza, index) => {
        const card = createPizzaCard(pizza, index);
        dataContainer.appendChild(card);
    });
}

function createPizzaCard(pizza, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    // Extraer datos reales de la API
    const id = pizza.id || index + 1;
    const name = pizza.name || `Pizza ${index + 1}`;
    const veg = pizza.veg ? 'Vegetariana' : 'Con Carne';
    const price = pizza.price || 'N/A';
    const description = pizza.description || 'Deliciosa pizza';
    const quantity = pizza.quantity || 1;
    const img = pizza.img || 'https://via.placeholder.com/300x200?text=Pizza';
    
    // Extraer información de sizeandcrusts
    let sizeInfo = '';
    if (pizza.sizeandcrusts && pizza.sizeandcrusts.length > 0) {
        const sizes = pizza.sizeandcrusts.map(size => {
            const sizeNames = Object.keys(size).filter(key => key !== 'price');
            return sizeNames.join(', ');
        }).join(' | ');
        sizeInfo = sizes;
    }
    
    // Extraer precios de diferentes tamaños
    let priceInfo = '';
    if (pizza.sizeandcrusts && pizza.sizeandcrusts.length > 0) {
        const prices = pizza.sizeandcrusts.map(size => `${size.price}`).join(' / ');
        priceInfo = prices;
    }
    
    col.innerHTML = `
        <div class="card h-100">
            <img src="${img}" class="card-img-top" alt="${name}" style="height: 200px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/300x200?text=🍕'">
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title">${name}</h5>
                    <span class="badge ${pizza.veg ? 'bg-success' : 'bg-warning'}">${veg}</span>
                </div>
                
                <p class="card-text flex-grow-1">${description}</p>
                
                <div class="pizza-details mb-3">
                    <small class="text-muted d-block">
                        <strong>ID:</strong> ${id}
                    </small>
                    <small class="text-muted d-block">
                        <strong>Cantidad disponible:</strong> ${quantity}
                    </small>
                    ${sizeInfo ? `<small class="text-muted d-block"><strong>Tamaños:</strong> ${sizeInfo}</small>` : ''}
                    <small class="text-success">
                        <strong>Precios:</strong> ${priceInfo || `${price}`}
                    </small>
                </div>
                
                <button class="btn btn-primary btn-sm mt-auto" onclick="showPizzaDetails('${name}', '${priceInfo || price}', '${veg}')">
                    Ordenar Pizza
                </button>
            </div>
        </div>
    `;

    return col;
}


function showPizzaDetails(name, price, type) {
    alert(`¡Excelente elección!\n\nPizza: ${name}\nTipo: ${type}\nPrecios: ${price}\n\n¿Confirmar pedido?`);
}

function showLoading(show) {
    loadingSpinner.classList.toggle('d-none', !show);
    loadButton.disabled = show;
}

function showError(message) {
    dataContainer.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger">${message}</div>
        </div>
    `;
}