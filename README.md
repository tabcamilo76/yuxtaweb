# YuxtaSearch - Motor de Búsqueda Híbrido

Motor de búsqueda con **interfaz propia** que busca en **Google** pero sin mostrar que es Google. Tu marca, resultados reales de Internet.

## 🚀 Características

- 🔍 **Busca en Google** pero con TU interfaz
- 🎨 **100% personalizable** - Tu logo, tus colores
- 🌓 **Modo oscuro/claro**
- ⚡ **Resultados reales** de millones de páginas
- 🎯 **Sin marca de Google** - Solo tu marca
- 📱 **Diseño responsive**
- 🚫 **Sin anuncios visibles** en tu interfaz

## 📋 Archivos incluidos

- `index.html` - Interfaz del buscador
- `styles.css` - Estilos personalizados
- `search-engine.js` - Motor que conecta con Google
- `logo.png` - Tu logo (agrégalo tú)

## ⚠️ IMPORTANTE - API de Google

El código usa la API pública de Google Custom Search. Tiene límites:
- **100 búsquedas gratis por día**
- Después necesitas tu propia API Key

### Cómo obtener tu API Key (GRATIS):

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo
3. Habilita "Custom Search API"
4. Crea credenciales → API Key
5. Ve a [Programmable Search Engine](https://programmablesearchengine.google.com/)
6. Crea un motor de búsqueda
7. Copia el "Search Engine ID"

Luego edita `search-engine.js` línea 12-13:
```javascript
const apiKey = 'TU_API_KEY_AQUI';
const searchEngineId = 'TU_SEARCH_ENGINE_ID';
```

**Plan gratuito:** 100 búsquedas/día  
**Plan pago:** $5 por cada 1000 búsquedas adicionales

## 🛠️ Instalación en GitHub Pages

### Paso 1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en **"New"** (nuevo repositorio)
3. Nombre: `yuxtasearch`
4. Marca **"Public"**
5. **"Create repository"**

### Paso 2: Subir archivos

**Desde la web de GitHub:**

1. En tu repositorio → **"uploading an existing file"**
2. Arrastra estos archivos:
   - `index.html`
   - `styles.css`
   - `search-engine.js`
   - `logo.png` (tu logo)
3. **"Commit changes"**

**Usando Git:**

```bash
git clone https://github.com/TU_USUARIO/yuxtasearch.git
cd yuxtasearch
# Copia los archivos aquí
git add .
git commit -m "YuxtaSearch - Motor híbrido"
git push origin main
```

### Paso 3: Activar GitHub Pages

1. Settings → Pages
2. Source → **"main"**
3. Save
4. Espera 2 minutos

### Paso 4: ¡Listo!

```
https://TU_USUARIO.github.io/yuxtasearch/
```

## 🎨 Personalizar

### Tu logo
1. Crea tu logo (PNG, 300x100px recomendado)
2. Nómbralo `logo.png`
3. Súbelo al repositorio

### Cambiar colores
Edita `styles.css` línea 2:
```css
--accent: #1a73e8; /* Cambia este color */
```

### Tu propia API
Edita `search-engine.js` líneas 12-13 con tus credenciales de Google.

## 💡 Cómo funciona

1. Usuario escribe búsqueda en TU interfaz
2. JavaScript envía consulta a Google Custom Search API
3. Google devuelve resultados
4. Tu interfaz los muestra con TU diseño
5. El usuario ve SOLO tu marca

**Nadie sabrá que usas Google** - Solo ven tu interfaz.

## 🎯 Ventajas

✅ **Tu marca** - Logo y colores propios  
✅ **Resultados reales** - De toda Internet  
✅ **Rápido** - Powered by Google  
✅ **Profesional** - Interfaz limpia  
✅ **100 búsquedas gratis/día**  

## ⚠️ Limitaciones

- 100 búsquedas gratuitas por día (con API básica)
- Necesitas API Key para producción
- Algunas búsquedas pueden mostrar mensaje de Google

## 🔄 Alternativa sin API

Si no quieres configurar API, el código automáticamente:
- Abrirá Google en nueva pestaña
- Seguirá funcionando
- Pero mostrará que usa Google

## 🚀 Mejoras futuras

- Agregar caché de resultados
- Historial de búsquedas
- Búsqueda por voz
- Filtros avanzados
- Sugerencias automáticas

## 📝 Licencia

Uso libre personal y comercial.

---

**Desarrollado con ❤️ por YuxtaCorp**

*Interfaz propia + Poder de Google = Tu buscador perfecto*

