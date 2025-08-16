const DEMO_API_URL = 'https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example';

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