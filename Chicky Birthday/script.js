// Password Check
let passwordTries = 0;

function showPopup(message) {
    const popup = document.getElementById('success-popup');
    if (!popup) return;
    popup.querySelector('.popup-message').innerText = message;
    popup.classList.add('visible');
    setTimeout(() => popup.classList.remove('visible'), 3200);
}

function checkPassword() {
    const password = document.getElementById('password-input').value;
    passwordTries++;
    if (password === 'Chicky') {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        createHearts();
        setupScrollAnimations();

        // Internal tracking (developer-only)
        console.log('Site accessed successfully after', passwordTries, 'tries');

        // User-facing celebration note
        showPopup('Welcome, my love! 🥰 Enjoy the celebration.');
    } else {
        document.getElementById('error-message').style.display = 'block';
        console.log('Failed password attempt #' + passwordTries);
    }
}

// Add enter key support
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkPassword();
            }
        });
    }
});

// Start Celebration
function startCelebration() {
    window.location.href = 'memories.html';
}

// Tracker clicks
function trackerClick(id) {
    console.log('Hidden tracker ' + id + ' clicked!');

    // Display clean in-app popup instead of browser alert
    if (id === 1) {
        showPopup('🎁 Surprise! You found a hidden gift: A virtual hug! 🤗');
    } else if (id === 2) {
        showPopup("🎁 Hidden gift: You're amazing! Keep exploring! 🌟");
    } else if (id === 3) {
        showPopup('🎁 Secret message: I love you more than words can say! 💕');
    } else if (id === 4) {
        showPopup("🎁 Found it! Here's a digital kiss: 😘");
    }
}

// Generate Floating Hearts
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return; // In case it's not on the page
    const heartSymbols = ['❤️', '💖', '💕', '✨'];
    
    for (let i = 0; i < 10; i++) {  // Reduced from 20 to 10 for better performance
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Randomize positioning and animation
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        
        container.appendChild(heart);
    }
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Initialize
window.onload = () => {
    // Create hearts if container exists
    if (document.getElementById('hearts-container')) {
        createHearts();
    }
    // Setup scroll animations if there are elements to animate
    if (document.querySelectorAll('.fade-up').length > 0) {
        setupScrollAnimations();
    }
};