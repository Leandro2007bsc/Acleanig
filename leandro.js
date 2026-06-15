// ===== CREAR BURBUJAS ANIMADAS =====
function createBubbles() {
    const bubbleContainer = document.getElementById('bubbleContainer');
    if (bubbleContainer) {
        for (let i = 0; i < 10; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubbleContainer.appendChild(bubble);
        }
    }
}

// ===== MAPA INTERACTIVO =====
const map = L.map('map').setView([41.6961, -71.1601], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

const marker = L.marker([41.69614, -71.16012]).addTo(map);
marker.bindPopup(`
            <b>🧼 AC Cleaning Inc</b><br>
            220 Morgan St, 02721<br>
            Fall River, MA - USA<br>
            📞 <a href="tel:7748888439">774 888 8439</a> (Español)<br>
            📞 <a href="tel:7748887029">774 888 7029</a> (English)
        `).openPopup();
// ===== FORMULARIO DE CONTACTO =====
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            if (response.status === 200) {
                alert('✓ ¡Solicitud enviada! Nos pondremos en contacto muy pronto.');
                form.reset();
            } else {
                alert('✕ Hubo un error al procesar el formulario.');
            }
        })
        .catch(error => {
            alert('✕ Error de conexión. Inténtalo de nuevo.');
        });
    });
}
// ===== MENÚ HAMBURGUESA MEJORADO =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    // Toggle menú al hacer clic en hamburger
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            navLinks.classList.remove('active');

            // Scroll suave
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        });
    });

    // Cerrar menú si hace clic fuera de él
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// ===== SCROLL SUAVE PARA BOTONES =====
document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== INICIALIZAR BURBUJAS AL CARGAR LA PÁGINA =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBubbles);
} else {
    createBubbles();
}