/* ============================================
   SHADOWTRAP AIRLOCK — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.85)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.threat-card, .feature-card, .pricing-card, .spec-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add animate-in class handler
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===== Counter Animation for Stats =====
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * count);

                    target.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        target.textContent = count;
                    }
                }

                requestAnimationFrame(update);
                countObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });

    // ===== Terminal Typing Effect =====
    const terminalLines = document.querySelectorAll('.terminal-line:not(.spacer):not(.blink)');

    function typeTerminalLines() {
        terminalLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';

            setTimeout(() => {
                line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, 300 + (index * 150));
        });
    }

    // Run typing effect when terminal is visible
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeTerminalLines();
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        terminalObserver.observe(terminalWindow);
    }

    // ===== Pricing Card Hover Effect =====
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'var(--accent-green)';
                this.style.boxShadow = '0 0 20px rgba(0,255,170,0.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = 'var(--border)';
                this.style.boxShadow = 'none';
            }
        });
    });

    // ===== Threat Card Glow Effect =====
    const threatCards = document.querySelectorAll('.threat-card');

    threatCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 24px rgba(255,85,85,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ===== Feature Card Glow Effect =====
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 24px rgba(88,166,255,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ===== Counter Row Animation =====
    const counterRows = document.querySelectorAll('.counter-row');

    counterRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;

        const rowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    rowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        rowObserver.observe(row);
    });

    // ===== Parallax Effect for Hero =====
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg && !window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (heroBg) {
                heroBg.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ===== Code Block Syntax Highlighting Enhancement =====
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--accent-purple)';
            this.style.boxShadow = '0 0 20px rgba(163,113,247,0.1)';
        });

        block.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border)';
            this.style.boxShadow = 'none';
        });
    });

    // ===== Flow Diagram Step Animation =====
    const flowSteps = document.querySelectorAll('.flow-step');

    flowSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'scale(0.9)';
        step.style.transition = `opacity 0.4s ease ${index * 0.2}s, transform 0.4s ease ${index * 0.2}s`;

        const flowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    flowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        flowObserver.observe(step);
    });

    // ===== Spec Card Animation =====
    const specCards = document.querySelectorAll('.spec-card');

    specCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        const specObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    specObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        specObserver.observe(card);
    });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== Easter Egg: Konami Code =====
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);

        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger easter egg
            document.body.style.animation = 'glitch 0.3s ease';

            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎯 ShadowTrap Airlock — Deception Protocol Activated');
            }, 300);

            konamiCode = [];
        }
    });

    // Add glitch animation
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0% { filter: none; }
            20% { filter: hue-rotate(90deg) saturate(2); }
            40% { filter: hue-rotate(180deg) invert(1); }
            60% { filter: hue-rotate(270deg) saturate(2); }
            80% { filter: hue-rotate(360deg); }
            100% { filter: none; }
        }
    `;
    document.head.appendChild(glitchStyle);

    console.log('%c⚡ SHADOWTRAP AIRLOCK', 'color: #00ffaa; font-size: 24px; font-weight: bold;');
    console.log('%cAutonomous Deception Engine for the AI Era', 'color: #8b949e; font-size: 14px;');
    console.log('%cReady to mislead attackers.', 'color: #58a6ff; font-size: 12px;');
});
