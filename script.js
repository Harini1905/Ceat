// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Particle background effect for hero section
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.8; // smaller sizes (0.8 to 2)
        this.speedX = (Math.random() * 1.2 - 0.6) * 0.5; // slower horizontal speed (-0.3 to 0.3)
        this.speedY = (Math.random() * 1.2 - 0.6) * 0.5; // slower vertical speed (-0.3 to 0.3)
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // lower opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particle effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const heroSection = document.querySelector('.hero');
heroSection.style.position = 'relative';
heroSection.appendChild(canvas);

canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';
canvas.style.display = 'block';

function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const particleCount = 40; // fewer particles for subtlety
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    requestAnimationFrame(animate);
}

animate();

// Hamburger menu for mobile
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') navLinks.classList.toggle('active');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Dark mode toggle
const darkModeBtn = document.querySelector('.dark-mode-toggle');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeBtn.innerHTML = document.body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// Ripple effect for buttons
document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.classList.remove('active');
        void this.offsetWidth; // trigger reflow
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 500);
    });
});

// Modal for contact form
const contactModal = document.getElementById('contactModal');
const openContactModal = document.getElementById('openContactModal');
const closeContactModal = document.getElementById('closeContactModal');
openContactModal.addEventListener('click', () => {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => contactModal.querySelector('input').focus(), 100);
});
closeContactModal.addEventListener('click', closeModal);
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) closeModal();
});
function closeModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Contact form submission (demo)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = "Sending...";
    setTimeout(() => {
        formMessage.textContent = "Thank you for contacting us!";
        contactForm.reset();
        setTimeout(closeModal, 1200);
    }, 900);
});

// Animated number counters in About section
document.querySelectorAll('.stat-item').forEach((item, idx) => {
    if (!item.querySelector('.stat-number')) {
        const num = document.createElement('span');
        num.className = 'stat-number';
        num.dataset.target = [120, 8, 15][idx] || 10;
        num.textContent = '0';
        item.insertBefore(num, item.querySelector('h3'));
    }
});
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(num => {
        const update = () => {
            const target = +num.dataset.target;
            let current = +num.textContent.replace(/\D/g, '');
            const increment = Math.ceil(target / 40);
            if (current < target) {
                num.textContent = current + increment;
                setTimeout(update, 30);
            } else {
                num.textContent = target;
            }
        };
        update();
    });
}
let countersAnimated = false;
window.addEventListener('scroll', () => {
    const about = document.querySelector('.about');
    if (!countersAnimated && about.getBoundingClientRect().top < window.innerHeight - 100) {
        animateCounters();
        countersAnimated = true;
    }
});

// Make research cards focusable for accessibility
document.querySelectorAll('.research-card').forEach(card => {
    card.setAttribute('tabindex', '0');
});

// Accordion interactivity for Vision, Mission & Objectives
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Collapse all
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.setAttribute('aria-expanded', 'false');
            h.nextElementSibling.hidden = true;
        });
        // Expand clicked if it was not already expanded
        if (!expanded) {
            this.setAttribute('aria-expanded', 'true');
            this.nextElementSibling.hidden = false;
        }
    });
});

// Tabs interactivity for Subdivisions section
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
});

// Journal Publications Accordion
document.querySelectorAll('.jp-accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.jp-accordion-header').forEach(h => {
            h.setAttribute('aria-expanded', 'false');
            h.parentElement.querySelector('.jp-accordion-body').hidden = true;
        });
        if (!expanded) {
            this.setAttribute('aria-expanded', 'true');
            this.parentElement.querySelector('.jp-accordion-body').hidden = false;
        }
    });
});

// Info Cards Section: Show/hide details on click, display content after all cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.info-card');
    const details = document.querySelectorAll('.info-card-details');

    let displayArea = document.getElementById('info-card-active-content');
    if (!displayArea) {
        displayArea = document.createElement('div');
        displayArea.id = 'info-card-active-content';
        const container = document.querySelector('.info-cards-section .container');
        if (container) {
            const allDetails = container.querySelectorAll('.info-card-details');
            if (allDetails.length > 0) {
                allDetails[allDetails.length - 1].after(displayArea);
            } else {
                container.appendChild(displayArea);
            }
        }
    }

    details.forEach(d => {
        d.hidden = true;
        d.style.display = '';
    });

    const patentTableHTML = `
        <h3>Patent Details</h3>
        <div style="overflow-x:auto;">
        <table class="journal-publications-table" style="min-width:900px">
            <thead>
                <tr>
                    <th>S No</th>
                    <th>Type</th>
                    <th>Patent Title</th>
                    <th>Appl. Number</th>
                    <th>Date Filed</th>
                    <th>Status</th>
                    <th>Inventors</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>1</td><td>Patent</td><td>A specialized scrub nurse robotic system for facilitating surgical operations and the method thereof</td><td>202541011520</td><td>11-02-2025</td><td>Published</td><td>Dr Rekha D</td></tr>
                <tr><td>2</td><td>Patent</td><td>System and Method for Detecting Quality Of Fabric</td><td>202541008372</td><td>31-01-2025</td><td>Published</td><td>Dr Rekha D</td></tr>
                <tr><td>3</td><td>Patent</td><td>System And Method for Predicting Onset Of Labor By Analysing Real-Time Data During Maternity Period</td><td>202441081172</td><td>01.11.2024</td><td>Published</td><td>Iyswarya Annapoorani</td></tr>
                <tr><td>4</td><td>Patent</td><td>System And Method for Detecting Defects in Cloth Materials</td><td>202441066942</td><td>04-09-2024</td><td>Published</td><td>Prithivie<br>Rekha D</td></tr>
                <tr><td>5</td><td>Patent</td><td>A System and Method for Crime Prediction Using Big Data Analytics</td><td>202441050922</td><td>07-07-2024</td><td>Published</td><td>Rekha D, Prithivie</td></tr>
                <tr><td>6</td><td>Patent</td><td>A Novel Method for Detecting Plant Disease</td><td>202441047302</td><td>30-06-2024</td><td>Published</td><td>Vignesh K</td></tr>
            </tbody>
        </table>
        </div>
    `;

    cards.forEach(card => {
        card.addEventListener('click', function () {
            cards.forEach(c => c.classList.remove('active'));
            details.forEach(d => d.hidden = true);

            this.classList.add('active');

            let content = '';

            if (this.dataset.detail === 'patents') {
                content = patentTableHTML;
            } else {
                const detail = this.querySelector('.info-card-details');
                content = detail ? detail.innerHTML : '';
            }

            displayArea.innerHTML = content;
        });
    });
});
