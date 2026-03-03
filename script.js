/**
 * TUSCANY CAMP - JAVASCRIPT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Dynamic Navbar Loader ---
    const navContainer = document.getElementById('nav-container');
    if (navContainer) {
        navContainer.innerHTML = `
            <!-- Navigation Bar -->
            <nav class="navbar" id="navbar">
                <div class="nav-wrapper">
                    <a href="index.html" class="logo">
                        <span class="logo-text">Tuscany Camp</span>
                    </a>
                    
                    <div class="nav-links" id="nav-links">
                        <a href="index.html">Home</a>
                        <a href="programma.html">Programma</a>
                        <a href="teachers.html">Guest Teachers</a>
                        <a href="packages.html">Packages</a>
                        <a href="contatti.html">Contatti</a>
                    </div>

                    <div class="nav-actions">
                        <a href="booking.html" class="btn btn-outline btn-sm">Booking</a>
                        <!-- Profile Avatar Icon -->
                        <a href="profilo.html" class="nav-profile-icon">
                            <span>M</span>
                        </a>
                        <button class="mobile-menu-btn" id="mobile-menu-btn">
                            <ion-icon name="menu-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu-overlay" id="mobile-menu">
                <div class="mobile-links">
                    <a href="index.html" class="mobile-link">Home</a>
                    <a href="programma.html" class="mobile-link">Programma</a>
                    <a href="teachers.html" class="mobile-link">Guest Teachers</a>
                    <a href="packages.html" class="mobile-link">Packages</a>
                    <a href="contatti.html" class="mobile-link">Contatti</a>
                    <a href="profilo.html" class="mobile-link" style="color: var(--accent-gold);">Il Mio Profilo</a>
                    <a href="booking.html" class="btn btn-primary mt-2">Booking Online</a>
                </div>
            </div>
        `;

        // Highlight active link based on current path
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });

        // Highlight Booking button if on booking page
        if (currentPath === 'booking.html') {
            const bookingBtn = document.querySelector('.nav-actions a[href="booking.html"]');
            if (bookingBtn) {
                bookingBtn.classList.remove('btn-outline');
                bookingBtn.classList.add('btn-primary');
            }
        }
    }

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        // Init check
        if (window.scrollY > 20) navbar.classList.add('scrolled');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinksElements = document.querySelectorAll('.mobile-link');

    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                mobileMenuBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
                document.body.style.overflow = '';
            }
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);

        mobileLinksElements.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    }

    // --- 3. Countdown Timer (Only on Home) ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const campStartDate = new Date('2026-07-15T09:00:00').getTime();

        const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = campStartDate - now;

            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "<div class='countdown-value'>Il Camp è iniziato!</div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const formatNumber = (num) => num < 10 ? `0${num}` : num;

            document.getElementById('days').innerText = formatNumber(days);
            document.getElementById('hours').innerText = formatNumber(hours);
            document.getElementById('minutes').innerText = formatNumber(minutes);
            document.getElementById('seconds').innerText = formatNumber(seconds);
        }, 1000);
    }

    // --- 4. Smooth Intersection Observer Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply to elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        // Change from keyframe to transition logic for better scroll integration
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

        // Handle delays assigned via classes (e.g., .delay-1)
        if (el.classList.contains('delay-1')) el.style.transitionDelay = '0.1s';
        if (el.classList.contains('delay-2')) el.style.transitionDelay = '0.2s';
        if (el.classList.contains('delay-3')) el.style.transitionDelay = '0.3s';

        observer.observe(el);
    });

    // Add CSS class toggler via JS for Intersection Observer
    // (This requires a CSS update for .fade-in-up.visible)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in-up.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
