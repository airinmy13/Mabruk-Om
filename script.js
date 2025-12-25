// ==================== //
// Particle Background  //
// ==================== //
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ==================== //
// Welcome Screen       //
// ==================== //
const btnStart = document.getElementById('btnStart');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');

btnStart.addEventListener('click', () => {
    welcomeScreen.style.animation = 'fadeOut 1s ease forwards';

    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.style.animation = 'fadeIn 1s ease forwards';

        // Auto confetti after 2 seconds
        setTimeout(() => {
            launchConfetti();
        }, 2000);
    }, 1000);
});

// ==================== //
// Audio Player         //
// ==================== //
const bgAudio = document.getElementById('bgAudio');
const btnPlayMusic = document.getElementById('btnPlayMusic');
const playIconDisplay = document.getElementById('playIconDisplay');
const playButtonText = document.getElementById('playButtonText');
let isPlaying = false;

// Function to play audio
function playAudio() {
    bgAudio.play().then(() => {
        isPlaying = true;
        playIconDisplay.textContent = '⏸️';
        playButtonText.textContent = '⏸️ Pause Lagu';
    }).catch(error => {
        console.log('Audio play failed:', error);
    });
}

// Function to pause audio
function pauseAudio() {
    bgAudio.pause();
    isPlaying = false;
    playIconDisplay.textContent = '▶️';
    playButtonText.textContent = '🎵 Putar Lagu';
}

// Toggle play/pause
if (btnPlayMusic) {
    btnPlayMusic.addEventListener('click', () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });
}

// ==================== //
// Confetti Effect      //
// ==================== //
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = [
            '#2563eb', '#3b82f6', '#60a5fa', '#0ea5e9',
            '#8b5cf6', '#a78bfa', '#fbbf24', '#fde047',
            '#f472b6', '#fb7185'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function launchConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
    animateConfetti();

    // Stop confetti after 5 seconds
    setTimeout(() => {
        confettiParticles = [];
    }, 5000);
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Confetti button
const btnConfetti = document.getElementById('btnConfetti');
btnConfetti.addEventListener('click', () => {
    launchConfetti();
    btnConfetti.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        btnConfetti.style.animation = '';
    }, 500);
});

// ==================== //
// Scroll Animations    //
// ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ==================== //
// Resize Handler       //
// ==================== //
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== //
// Additional Animations //
// ==================== //
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);

// ==================== //
// Initialize           //
// ==================== //
createParticles();

// Easter egg: Double click on title for extra confetti
document.querySelector('.main-title')?.addEventListener('dblclick', () => {
    launchConfetti();
});
