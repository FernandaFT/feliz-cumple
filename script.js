
// Colores vibrantes para los fuegos artificiales
const colors = [
    '#ff0000', '#ff6600', '#ffcc00',
    '#00ff00', '#00ccff', '#0066ff',
    '#cc00ff', '#ff00cc', '#ffffff'
];

// Crear fuego artificial en posición específica
function createFirework(x, y) {
    const particleCount = 50 + Math.floor(Math.random() * 30); // Menos partículas
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = 3 + Math.random() * 3; // Menor potencia
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Crear explosión central
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.backgroundColor = color;
    explosion.style.boxShadow = `0 0 10px 2px ${color}`; // Efecto más pequeño
    document.body.appendChild(explosion);

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Velocidad y dirección
        const angle = angleIncrement * i;
        const velocity = power * 0.5 + Math.random() * power;
        const lifetime = 800 + Math.random() * 800; // Menor duración

        // Estilos iniciales
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = color;

        // Variación de color para algunas partículas
        if (Math.random() > 0.8) { // Menos variación de color
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        // Tamaño aleatorio (más pequeño)
        const size = 1 + Math.random() * 3;
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

    // Gravedad (menor)
    const gravity = 0.03;
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
        const y = startY + velocityY * elapsed * 0.05 + gravity * elapsed * elapsed * 0.0003;

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

    // Tiempo más largo entre fuegos artificiales
    const delay = 2000 + Math.random() * 3000;
    setTimeout(autoFire, delay);
}

// Iniciar fuegos artificiales automáticos
window.onload = function () {
    // Comenzar con menos fuegos artificiales iniciales
    for (let i = 0; i < 2; i++) {
        setTimeout(() => {
            autoFire();
        }, i * 500);
    }
};
