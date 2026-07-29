document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Responsive Navigation Control ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');

            // Morph hamburger icon into an X
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('open')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // --- Header Shrink Effect on Scroll ---
    const header = document.querySelector('.global-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Premium Floating Back to Top Control ---
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- High-Performance Intersection Observer for Scroll Animations ---
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // If container contains numeric counter nodes, fire counter logic
                if (entry.target.classList.contains('counter-section')) {
                    initializeSequentialCounters();
                }
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    // Register animation selectors
    const animatedElements = document.querySelectorAll('.scroll-animate, .timeline-item, .counter-section');
    animatedElements.forEach(el => animationObserver.observe(el));

    // --- JavaScript Counter Component Logic ---
    function initializeSequentialCounters() {
        const counters = document.querySelectorAll('.counter-number');

        counters.forEach(counter => {
            if (counter.classList.contains('counted')) return;
            counter.classList.add('counted');

            const targetValue = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2200; // Counter execution pacing frame limit (ms)
            const frameRate = 1000 / 60;
            const totalFrames = Math.round(duration / frameRate);
            let frame = 0;

            const countIncrement = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Smooth cubic deceleration
                const currentValue = Math.floor(easeOutProgress * targetValue);

                counter.innerText = currentValue.toLocaleString();

                if (frame === totalFrames) {
                    counter.innerText = targetValue.toLocaleString();
                    clearInterval(countIncrement);
                }
            }, frameRate);
        });
    }

    // --- Premium Infinite Loop Typewriter Effect Engine ---
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        // String sequences mapping back to client copywriting parameters
        const phrases = [
            "High-Converting VSLs",
            "Sales Pages",
            "Ad Copies",
            "Video Scripts",
            "Conversion-Focused Copy"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let dynamicTypingSpeed = 80;

        function runTypewriterLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Remove character
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                dynamicTypingSpeed = 40; // Accelerated backspacing rhythm
            } else {
                // Add character
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                dynamicTypingSpeed = 100; // Natural rhythmic keystroke speed
            }

            // Word rendering phase changes
            if (!isDeleting && charIndex === currentPhrase.length) {
                dynamicTypingSpeed = 2000; // Structural reading pause block at end of statement
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length; // Shift horizontally to next array element
                dynamicTypingSpeed = 400; // Operational break window prior to writing next item
            }

            setTimeout(runTypewriterLoop, dynamicTypingSpeed);
        }

        // Kickstart typewriter loop sequence configuration frame
        setTimeout(runTypewriterLoop, 1000);
    }
});
