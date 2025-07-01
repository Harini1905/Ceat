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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particle effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const heroSection = document.querySelector('.hero');
heroSection.appendChild(canvas);

function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
for (let i = 0; i < 50; i++) {
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
    // Add a number span if not present
    if (!item.querySelector('.stat-number')) {
        const num = document.createElement('span');
        num.className = 'stat-number';
        // Example numbers, you can customize
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
        // Remove active from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        // Activate current
        this.classList.add('active');
        document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
});

// Journal Publications Accordion
document.querySelectorAll('.jp-accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Collapse all
        document.querySelectorAll('.jp-accordion-header').forEach(h => {
            h.setAttribute('aria-expanded', 'false');
            h.parentElement.querySelector('.jp-accordion-body').hidden = true;
        });
        // Expand clicked if it was not already expanded
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

    // Create display area after all info-card-details if not already present
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

    // Hide all details initially (using hidden attribute for accessibility)
    details.forEach(d => {
        d.hidden = true;
        d.style.display = '';
    });

    // Patent details HTML table
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
                <tr><td>5</td><td>Patent</td><td>A System and Method for Crime Prediction Using Machine Learning</td><td>202441062574</td><td>19-08-2024</td><td>Published</td><td>Rekha D<br>Gnanabharathi</td></tr>
                <tr><td>6</td><td>Patent</td><td>Smart Device for Monitoring Medication Schedules and Dispensing Pharmaceutical Pellets, And the Method Thereof</td><td>202441060027</td><td>08-08-2024</td><td>Published</td><td>Sakthivel G<br>Jegadeeshwaran R<br>Lakshmi Pathi J<br>Abirami S<br>Sivakumar R<br>Abdu Qaudir<br>Padmavathy T</td></tr>
                <tr><td>7</td><td>Design</td><td>Automobile Rear Light unit</td><td>417802-001</td><td>26.07.2024</td><td>Granted</td><td>Sumathi V<br>Sujith Kumaar D. H<br>Raja Rajeswari G<br>Rajkumar Murugesan<br>Vinod Vasan<br>Spoorthi J S</td></tr>
                <tr><td>8</td><td>Utility</td><td>Device for detection of toxic substance consumed by user and method thereof</td><td>202441048700</td><td>25.06.2024</td><td>Published</td><td>Mohammed Abdullah, Sumathi V</td></tr>
                <tr><td>9</td><td>Design</td><td>Automatic Mat-Nailing Machine for Non-Turf Cricket Pitches</td><td>419769-001</td><td>12-06-2024</td><td>Granted</td><td>Sakthivel G<br>Karan Arjun<br>Balamurali P M<br>Selvaganesh G T<br>Sivakumar R<br>Jegadeeshwaran R</td></tr>
                <tr><td>10</td><td>Utility</td><td>Device and method for protecting microgrids by detecting and isolating faults autonomously in real time</td><td>202441038973</td><td>17.05.2024</td><td>Published</td><td>Sumathi V<br>Adarsh JK<br>Sakthivel.G<br>Mohammed Abdullah</td></tr>
                <tr><td>11</td><td>Design</td><td>Two Input Speed Balancing Mechanism</td><td>414277-001</td><td>19-04-2024</td><td>Filed</td><td>Siddhi Bonthu<br>Kautilya Sai Nath<br>Jegadeeshwaran R<br>Sakthivel G</td></tr>
                <tr><td>12</td><td>Design</td><td>Bottle</td><td>410099-001</td><td>11.03.2024</td><td>Granted</td><td>Sumathi V<br>Rajkumar Murugesan<br>RajaRajeswari<br>Sandhya, P<br>R. Aruna<br>Vinod<br>Spoorthi J S<br>Sujith Kumaar D . H<br>Amogh Singh</td></tr>
                <tr><td>13</td><td>Utility</td><td>System for controlling temperature of cooking and method thereof</td><td>202441008901</td><td>09.02.2024</td><td>Published</td><td>Sumathi V<br>Rajarajeswari<br>Rajkumar Murugesan<br>Spoorthi J<br>Smogh singh</td></tr>
                <tr><td>14</td><td>Patent</td><td>A Smart Hammock System Preventing Rear Wheel Runover Accidents by Vehicles, And Method Thereof</td><td>202441006170</td><td>30-01-2024</td><td>Published</td><td>Rekha D<br>Sandhiya<br>Dr.Rajkumar Murugesan<br>Dr. Radha R<br>Jayanthi R<br>S.Rohit Madhavan<br>A. Philip</td></tr>
                <tr><td>15</td><td>Patent</td><td>Four switch three phase dual output inverter</td><td>201641018783</td><td>30.11.2023</td><td>Granted</td><td>Iyswarya Annapoorani</td></tr>
                <tr><td>16</td><td>Design</td><td>Online Tool Wear-Out Detection System For Low-Duty Cycle Machining Operations Using Silver-Polyester Thick Film Sensor</td><td>396300-001</td><td>29-09-2023</td><td>Filed</td><td>Sakthivel G<br>Jegadeeshwaran R<br>Lakshmi Pathi J<br>Sivakumar R<br>Manickavasagam<br>Govardhan YS</td></tr>
                <tr><td>17</td><td>Patent</td><td>Responsive Sensors for Particles Detection Using Machine Learning</td><td>202341056844</td><td>24-08-2023</td><td>Published</td><td>Raghukran N</td></tr>
                <tr><td>18</td><td>Utility</td><td>Analyzing patient health information based on IoT sensor with AI for improving patient assistance in the future direction</td><td>202041053094</td><td>6.12.2020</td><td>Published</td><td>Sumathi V<br>M. Braveen<br>Yaasavi joysula<br>Nachiappan<br>Prasad<br>Manikandan<br>K.Anusha<br>Asha Jerlin.M</td></tr>
                <tr><td>19</td><td>Patent</td><td>Smart Eye: An Underwater Rover to DETECT Marine Trash</td><td>202041043127</td><td>05-10-2020</td><td>Granted</td><td>Rekha D<br>Yukta Gupta<br>V. Neelanarayanan</td></tr>
                <tr><td>20</td><td>Patent</td><td>Virtual Assistant for Visually Impaired</td><td>202041043128</td><td>05-10-2020</td><td>Published</td><td>Rekha D<br>Harit Kapoor<br>V. Neelanarayanan</td></tr>
            </tbody>
        </table>
        </div>
    `;

    // International collaborations HTML table
    const collaborationsTableHTML = `
        <h3>International Collaborations</h3>
        <div style="overflow-x:auto;">
        <table class="journal-publications-table" style="min-width:900px">
            <thead>
                <tr>
                    <th>S. No</th>
                    <th>International University</th>
                    <th>Nature of Collaboration</th>
                    <th>Faculty Incharge</th>
                    <th>Year</th>
                    <th>Outcome</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Canfield University, UK.</td>
                    <td>Ongoing funded Project sponsored by Royal Academy of Engineering</td>
                    <td>Dr Sakthivel G;<br>Dr Lakshmi Pathi J</td>
                    <td>2022-2024</td>
                    <td>Inhouse developed small e-Tractor</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Asia Pacific University of Technology and Innovation, Malaysia.</td>
                    <td>Joint International Conference (IRMAS 2022; IRMAS2023) and an ongoing project Sponsred by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D</td>
                    <td>2022, 2023</td>
                    <td>Two conference; Accepted papers were published in JPCS and IOP</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>University of West Attica, Greece</td>
                    <td>Ongoing project Sponsored by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D;<br>Dr Lakshmi Pathi J</td>
                    <td>2023-2026</td>
                    <td>AGRHI Hub</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Middle East Technical University, Turkey</td>
                    <td>Ongoing project Sponsored by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D;<br>Dr Lakshmi Pathi J</td>
                    <td>2023-2026</td>
                    <td>Erasmus AGRHI Project</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>IMP PAN, Poland</td>
                    <td>Ongoing project Sponsored by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D;<br>Dr Lakshmi Pathi J</td>
                    <td>2023-2026</td>
                    <td>Erasmus AGRHI Project</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>University Malaysia Pahang, Malaysia</td>
                    <td>Ongoing project Sponsored by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D;<br>Dr Lakshmi Pathi J</td>
                    <td>2023-2026</td>
                    <td>Erasmus AGRHI Project</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Eastern University Sri Lanka</td>
                    <td>Ongoing project Sponsored by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D;<br>Dr Lakshmi Pathi J</td>
                    <td>2023-2026</td>
                    <td>Erasmus AGRHI Project</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>University of Jaffna Sri Lanka</td>
                    <td>Ongoing project Sponsored by Erasmus</td>
                    <td>Dr Sakthivel G;<br>Dr Jegadeeshwaran R;<br>Dr Saravanakumar D;<br>Dr Lakshmi Pathi J</td>
                    <td>2023-2026</td>
                    <td>Erasmus AGRHI Project</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>University of East Anglia</td>
                    <td>Collaborative Projects</td>
                    <td>Dr Jegadeeshwaran R;<br>Dr Lakshmi Pathi J</td>
                    <td>2023, 2024</td>
                    <td>Joint funding proposal application</td>
                </tr>
            </tbody>
        </table>
        </div>
    `;

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const key = card.getAttribute('data-card');
            const detailPanel = document.getElementById('card-' + key);
            const isActive = card.classList.contains('active');

            // Remove active from all cards
            cards.forEach(c => c.classList.remove('active'));

            // Hide all details
            details.forEach(d => d.hidden = true);

            // Toggle: if not active, show; if active, hide
            if (!isActive) {
                card.classList.add('active');
                if (displayArea) {
                    if (key === 'patents') {
                        displayArea.innerHTML = patentTableHTML;
                    } else if (key === 'international-collaborations') {
                        displayArea.innerHTML = collaborationsTableHTML;
                    } else if (key === 'journal-publications') {
                        // Show all year-wise journal publications expanded
                        const jpAccordion = document.querySelector('.jp-accordion');
                        if (jpAccordion) {
                            // Clone the accordion and expand all
                            const clone = jpAccordion.cloneNode(true);
                            clone.querySelectorAll('.jp-accordion-item').forEach(item => {
                                const header = item.querySelector('.jp-accordion-header');
                                const body = item.querySelector('.jp-accordion-body');
                                if (header && body) {
                                    header.setAttribute('aria-expanded', 'true');
                                    body.hidden = false;
                                }
                            });
                            // Also include the overview table and heading
                            const overview = document.querySelector('.journal-publications-overview-table-wrapper');
                            let html = '';
                            if (overview) html += overview.outerHTML;
                            html += '<h3 style="margin-top:32px;">Journal Publications (By Year)</h3>';
                            html += clone.outerHTML;
                            displayArea.innerHTML = html;
                        } else if (detailPanel) {
                            displayArea.innerHTML = detailPanel.innerHTML;
                        }
                    } else if (detailPanel) {
                        displayArea.innerHTML = detailPanel.innerHTML;
                    }
                }
            } else {
                if (displayArea) displayArea.innerHTML = '';
            }
        });
    });

    // On page load, ensure nothing is shown
    if (displayArea) displayArea.innerHTML = '';
});