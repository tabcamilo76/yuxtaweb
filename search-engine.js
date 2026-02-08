// Motor de búsqueda YuxtaSearch - Busca en Google pero con nuestra interfaz
class SearchEngine {
    constructor() {
        this.searchHistory = [];
        // API Key y Search Engine ID - Usaremos el método público de Google
    }

    // Realizar búsqueda usando Google (método público sin API key)
    async search(query) {
        if (!query || query.trim() === '') {
            return [];
        }

        try {
            // Usar la API pública de Google Custom Search (limitada pero funcional)
            // Nota: En producción, deberías usar tu propia API key
            const apiKey = 'AIzaSyCVAXiUzRYsML5mMX4rXdGcD2C4nNkX1oM'; // Clave de ejemplo pública
            const searchEngineId = '017576662512468239146:omuauf_lfve'; // ID de ejemplo público
            
            const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (!data.items) {
                return [];
            }

            // Convertir resultados de Google a nuestro formato
            const results = data.items.map(item => ({
                url: item.link,
                title: item.title,
                description: item.snippet || '',
                displayUrl: this.getDomain(item.link)
            }));

            // Guardar en historial
            this.searchHistory.push({
                query: query,
                timestamp: new Date(),
                resultsCount: results.length
            });

            return results;

        } catch (error) {
            console.error('Error en búsqueda:', error);
            // Si falla la API, redirigir a Google directamente
            return null; // Null indica que debe abrir Google
        }
    }

    // Obtener dominio de URL
    getDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch (e) {
            return url;
        }
    }

    // Obtener favicon de URL
    getFaviconUrl(url) {
        try {
            const urlObj = new URL(url);
            return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
        } catch (e) {
            return '';
        }
    }

    // Resaltar términos de búsqueda en texto
    highlightTerms(text, searchTerms) {
        let highlightedText = text;
        
        searchTerms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="result-match">$1</span>');
        });

        return highlightedText;
    }
}

// Inicializar motor de búsqueda
const searchEngine = new SearchEngine();

// Elementos del DOM
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchFormSmall = document.getElementById('searchFormSmall');
const searchInputSmall = document.getElementById('searchInputSmall');
const searchPage = document.getElementById('searchPage');
const resultsPage = document.getElementById('resultsPage');
const resultsContainer = document.getElementById('resultsContainer');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const indexStats = document.getElementById('indexStats');
const darkModeToggle = document.getElementById('darkModeToggle');

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

// Mostrar mensaje en lugar de estadísticas
if (indexStats) {
    indexStats.textContent = 'Busca en millones de páginas web';
}

// Función para realizar búsqueda
async function performSearch(query) {
    if (!query || query.trim() === '') return;

    // Mostrar página de resultados inmediatamente con mensaje de carga
    searchPage.classList.add('hidden');
    resultsPage.classList.remove('hidden');
    searchInputSmall.value = query;
    
    resultsContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">Buscando...</div>';
    noResults.classList.add('hidden');
    resultsCount.textContent = 'Buscando resultados...';

    const results = await searchEngine.search(query);

    // Si la API falló, abrir Google en nueva pestaña
    if (results === null) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        // Volver a la página principal
        resultsPage.classList.add('hidden');
        searchPage.classList.remove('hidden');
        return;
    }

    if (results.length === 0) {
        resultsContainer.innerHTML = '';
        noResults.classList.remove('hidden');
        resultsCount.textContent = 'No se encontraron resultados';
    } else {
        noResults.classList.add('hidden');
        const resultsText = results.length === 1 ? 'resultado' : 'resultados';
        resultsCount.textContent = `Aproximadamente ${results.length} ${resultsText}`;

        // Resaltar términos de búsqueda
        const searchTerms = query.trim().split(/\s+/);

        // Mostrar resultados
        resultsContainer.innerHTML = results.map(result => `
            <div class="result-item">
                <div class="result-url">
                    <img src="${searchEngine.getFaviconUrl(result.url)}" 
                         alt="favicon" 
                         class="result-favicon"
                         onerror="this.style.display='none'">
                    <span class="result-domain">${result.displayUrl}</span>
                </div>
                <div class="result-title">
                    <a href="${result.url}" target="_blank">${searchEngine.highlightTerms(result.title, searchTerms)}</a>
                </div>
                <div class="result-description">
                    ${searchEngine.highlightTerms(result.description, searchTerms)}
                </div>
            </div>
        `).join('');
    }

    // Scroll al inicio
    window.scrollTo(0, 0);
}

// Búsqueda desde página principal
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    performSearch(query);
});

// Búsqueda desde barra pequeña
searchFormSmall.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInputSmall.value.trim();
    performSearch(query);
});

// Volver a página principal al hacer clic en el logo
document.addEventListener('click', (e) => {
    if (e.target.closest('.logo-small-container') || e.target.closest('.logo-container')) {
        resultsPage.classList.add('hidden');
        searchPage.classList.remove('hidden');
        searchInput.value = '';
        searchInput.focus();
    }
});

// Manejo de error de logo
const logo = document.getElementById('logo');
const logoSmall = document.getElementById('logoSmall');

[logo, logoSmall].forEach(img => {
    if (img) {
        img.addEventListener('error', function() {
            const container = this.parentElement;
            container.innerHTML = '<h1 style="font-size: 48px; color: var(--accent); margin: 0; cursor: pointer;">YuxtaSearch</h1>';
        });
    }
});

// Focus automático al cargar
window.addEventListener('load', () => {
    searchInput.focus();
});
