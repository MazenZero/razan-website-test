// ============================================
// script-landing.js - Ancient Identity Theme
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Handle logo loading error - fallback if image missing
    const logoImg = document.getElementById('siteLogo');
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            // If logo.png doesn't exist, create a text fallback
            const logoWrapper = document.querySelector('.logo-wrapper');
            if (logoWrapper && !logoWrapper.querySelector('.logo-fallback')) {
                const fallbackLogo = document.createElement('div');
                fallbackLogo.className = 'logo-fallback';
                fallbackLogo.innerHTML = '⚜️';
                fallbackLogo.style.cssText = `
                    font-family: 'Cinema Decorative', serif;
                    font-size: 2.5rem;
                    color: #e8d5a3;
                    text-shadow: 0 0 15px rgba(232,213,163,0.5);
                `;
                logoWrapper.innerHTML = '';
                logoWrapper.appendChild(fallbackLogo);
            }
        });
    }
    
    // Start Journey Button - Redirect to Quiz
    const startBtn = document.getElementById('startJourneyBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 150);
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
    
    // Civilization Modal Data
    const civData = {
        egyptian: {
            title: "EGYPTIAN CIVILIZATION",
            desc: "Step into the world of Pharaohs, pyramids, and eternal wisdom. The ancient Egyptians believed in balance, Ma'at, and the journey of the soul. Their legacy teaches us about power, mystery, and the art of leaving a mark that lasts forever.",
            icon: "𓋹"
        },
        greco: {
            title: "GRECO-ROMAN CIVILIZATION",
            desc: "From the philosophy of Socrates to the might of Rome, Greco-Roman culture shaped Western thought. Heroes, gods, and the pursuit of excellence defined these civilizations. Discover your inner warrior, thinker, or ruler.",
            icon: "⚡"
        },
        islamic: {
            title: "ISLAMIC GOLDEN AGE",
            desc: "An era of knowledge, art, and scientific breakthrough. From Baghdad to Cordoba, scholars advanced mathematics, medicine, and philosophy. This civilization celebrates wisdom, justice, and the beauty of discovery.",
            icon: "✧"
        }
    };
    
    // Create Modal dynamically if it doesn't exist
    let modal = document.getElementById('civModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'civModal';
        modal.className = 'civ-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-icon"></div>
                <h2 id="modalTitle"></h2>
                <p id="modalDesc"></p>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const modalClose = modal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalIcon = modal.querySelector('.modal-icon');
    
    function openModal(civType) {
        const data = civData[civType];
        if (data) {
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalDesc) modalDesc.textContent = data.desc;
            if (modalIcon) {
                modalIcon.innerHTML = data.icon;
                modalIcon.style.fontSize = '3rem';
            }
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Add click event to civilization cards
    const cards = document.querySelectorAll('.civ-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const civType = this.getAttribute('data-civ');
            openModal(civType);
        });
    });
    
    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.civ-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effect to start button
    const startButton = document.querySelector('.start-journey-btn');
    if (startButton) {
        startButton.addEventListener('mouseenter', function() {
            this.style.gap = '15px';
        });
        startButton.addEventListener('mouseleave', function() {
            this.style.gap = '12px';
        });
    }
    
    // Add subtle parallax effect on hero
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero && scrollPos < 600) {
            hero.style.backgroundPosition = `center ${scrollPos * 0.2}px`;
        }
    });
    
    // Logo animation on load
    const logo = document.querySelector('.site-logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.9)';
        setTimeout(() => {
            logo.style.transition = 'all 0.6s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 100);
    }
    
    console.log('✨ Ancient Identity Landing Page Ready - Logo with museum text, transparent background ✨');
});