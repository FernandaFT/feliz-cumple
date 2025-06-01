
// Colores vibrantes para los fuegos artificiales
const colors = [
    '#ff0000', '#ff6600', '#ffcc00',
    '#00ff00', '#00ccff', '#0066ff',
    '#cc00ff', '#ff00cc', '#ffffff'
];

// Crear fuego artificial en posición específica
function createFirework(x, y) {
    const particleCount = 100 + Math.floor(Math.random() * 50);
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 5 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Crear explosión central
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.backgroundColor = color;
    explosion.style.boxShadow = `0 0 20px 5px ${color}`;
    document.body.appendChild(explosion);

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Velocidad y dirección
        const angle = angleIncrement * i;
        const velocity = power * 0.5 + Math.random() * power;
        const lifetime = 1000 + Math.random() * 1000;

        // Estilos iniciales
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = color;

        // Variación de color para algunas partículas
        if (Math.random() > 0.7) {
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        // Tamaño aleatorio
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        document.body.appendChild(particle);

        // Animación de la partícula
        animateParticle(particle, angle, velocity, lifetime);
    }

    // Eliminar explosión después de animación
    setTimeout(() => {
        explosion.remove();
    }, 1000);
}

// Animar partículas
function animateParticle(particle, angle, velocity, lifetime) {
    const startTime = Date.now();
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);

    // Gravedad
    const gravity = 0.05;
    let velocityX = Math.cos(angle) * velocity;
    let velocityY = Math.sin(angle) * velocity;

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / lifetime;

        if (progress >= 1) {
            particle.remove();
            return;
        }

        // Aplicar gravedad
        velocityY += gravity;

        // Actualizar posición
        const x = startX + velocityX * elapsed * 0.05;
        const y = startY + velocityY * elapsed * 0.05 + gravity * elapsed * elapsed * 0.0005;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = 1 - progress;

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// Disparar fuegos artificiales automáticamente
function autoFire() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6;
    createFirework(x, y);

    // Tiempo aleatorio para el próximo fuego artificial
    const delay = 500 + Math.random() * 1500;
    setTimeout(autoFire, delay);
}

// Iniciar fuegos artificiales automáticos
window.onload = function () {
    // Comenzar con varios fuegos artificiales
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            autoFire();
        }, i * 300);
    }

    // Disparar con clic del mouse
    document.addEventListener('click', function (e) {
        createFirework(e.clientX, e.clientY);
    });

    // Disparar con toque en dispositivos móviles
    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        createFirework(e.touches[0].clientX, e.touches[0].clientY);
    });
};