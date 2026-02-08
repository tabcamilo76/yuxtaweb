// Motor de búsqueda YuxtaSearch - Redirige a Google con tu interfaz
class SearchEngine {
    constructor() {
        this.searchHistory = [];
    }

    // Realizar búsqueda - redirige a Google directamente
    search(query) {
        if (!query || query.trim() === '') {
            return;
        }

        // Guardar en historial
        this.searchHistory.push({
            query: query,
            timestamp: new Date()
        });

        // Abrir Google con la búsqueda en una nueva pestaña
        // pero usando la URL más limpia posible
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`;
        window.location.href = searchUrl;
    }
}

// Inicializar motor de búsqueda
const searchEngine = new SearchEngine();

// Elementos del DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const darkModeToggle = document.getElementById('darkModeToggle');
const indexStats = document.getElementById('indexStats');

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Toggle modo oscuro
darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mostrar mensaje
if (indexStats) {
    indexStats.textContent = 'Busca en millones de páginas web';
}

// Búsqueda desde página principal
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        searchEngine.search(query);
    }
});

// Manejo de error de logo
const logo = document.getElementById('logo');

if (logo) {
    logo.addEventListener('error', function() {
        const container = this.parentElement;
        container.innerHTML = '<h1 style="font-size: 48px; color: var(--accent); margin: 0;">YuxtaSearch</h1>';
    });
}

// Focus automático al cargar
window.addEventListener('load', () => {
    searchInput.focus();
});
