// MLY Group Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('MLY Group website loaded successfully');

    /** ---------------- Header Scroll Effect ---------------- **/
    const header = document.getElementById('header');
    const overlay = document.querySelector('.overlay');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-neutral-400', 'backdrop-blur-xl', 'shadow-2xl', 'nav-blur');
            if (overlay) overlay.classList.remove('hidden');
        } else {
            header.classList.remove('bg-neutral-400', 'backdrop-blur-xl', 'shadow-2xl', 'nav-blur');
            if (overlay) overlay.classList.add('hidden');
        }
    });

    /** ---------------- Smooth Scrolling ---------------- **/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /** ---------------- Counter Animation ---------------- **/
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                element.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(start) + (target === 100 ? '%' : '+');
            }
        }, 16);
    };

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.querySelectorAll('[data-count]').forEach(counter => {
                        const target = parseInt(counter.dataset.count);
                        animateCounter(counter, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        aboutObserver.observe(aboutSection);
    }

    /** ---------------- Scroll Animations ---------------- **/
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));

    /** ---------------- Form Submission ---------------- **/
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.textContent = '✓ Message Sent!';
            button.classList.add('bg-green-600');
            button.classList.remove('bg-indigo-600');

            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
                button.classList.remove('bg-green-600');
                button.classList.add('bg-indigo-600');
            }, 3000);
        });
    }

    /** ---------------- Mobile Menu Toggle ---------------- **/
    window.toggleMobileMenu = () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (!navLinks || !hamburger) return;

        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        navLinks.classList.toggle('flex-col');
        navLinks.classList.toggle('absolute');
        navLinks.classList.toggle('top-full');
        navLinks.classList.toggle('left-0');
        navLinks.classList.toggle('w-full');
        navLinks.classList.toggle('bg-white');
        navLinks.classList.toggle('shadow-lg');
        navLinks.classList.toggle('p-4');

        hamburger.querySelectorAll('span').forEach(span => span.classList.toggle('rotate-45'));
    };

    /** ---------------- Slideshow ---------------- **/
    const slides = document.querySelector('.slides');
    if (slides) {
        const totalSlides = slides.children.length;
        let index = 0;

        const showSlide = (i) => {
            index = (i + totalSlides) % totalSlides;
            slides.style.transform = `translateX(-${index * 100}%)`;
        };

        setInterval(() => showSlide(index + 1), 3000);
    }

    /** ---------------- Service Box Hover Effect ---------------- **/
    const groups = document.querySelectorAll('.group');
    groups.forEach(group => {
        const title = group.querySelector('.service-title');
        const text = group.querySelector('.service-text');

        const overlay = document.createElement('div');
        overlay.className = "absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 rounded-2xl z-0";
        group.style.position = "relative";
        group.insertBefore(overlay, group.firstChild);

        if (title) title.classList.add('transition-opacity', 'duration-300', 'relative', 'z-10');
        if (text) text.classList.add('transition-opacity', 'duration-300', 'opacity-0', 'relative', 'z-10');

        group.addEventListener('mouseenter', () => {
            overlay.classList.replace('opacity-0', 'opacity-100');
            if (title) title.classList.add('opacity-0');
            if (text) text.classList.remove('opacity-0');
        });

        group.addEventListener('mouseleave', () => {
            overlay.classList.replace('opacity-100', 'opacity-0');
            if (title) title.classList.remove('opacity-0');
            if (text) text.classList.add('opacity-0');
        });
    });
});
