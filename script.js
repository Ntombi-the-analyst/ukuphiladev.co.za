const year = new Date().getFullYear();
const footerBottom = document.querySelector('.footer-bottom');
footerBottom.innerHTML = `&copy; ${year} Ukuphila KwakaNdengezi Development. A Christ-centered NPO empowering lives through education, faith and support.`;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');  
        }
    });

    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link, .logo, .cta-primary, .cta-secondary, .program-link, .nav-cta, .footer-links a');
    const pageSections = document.querySelectorAll('.page-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Allow external links, mailto, tel, WhatsApp, and links to other HTML pages to work normally
            if (!href || 
                href.startsWith('http') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') || 
                href.startsWith('https://wa.me') ||
                (href.includes('.html') && !href.startsWith('#'))) {
                return; // Let the browser handle external links and page links
            }
            
            // Handle anchor links within the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Hide all sections
                pageSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show target section
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Check if it's a page-section
                    if (targetSection.classList.contains('page-section')) {
                        targetSection.classList.add('active');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        // It's an anchor within a section - scroll to it
                        const parentSection = targetSection.closest('.page-section');
                        if (parentSection) {
                            parentSection.classList.add('active');
                        }
                        window.scrollTo({
                            top: targetSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // Close mobile menu if open
                const navLinksEl = document.querySelector('.nav-links');
                if (navLinksEl) {
                    navLinksEl.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksEl = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinksEl.classList.toggle('active');
        });
    }

    // Mini stats slider functionality
    function initMiniSliders() {
        const sliders = document.querySelectorAll('.mini-slider');
        
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.mini-slide');
            const name = slider.getAttribute('data-name');
            const foundation = slider.getAttribute('data-foundation');
            
            // Generate years slides if it's the years slider
            if (name === 'years' && foundation) {
                const currentYear = new Date().getFullYear();
                const foundationYear = parseInt(foundation);
                const years = currentYear - foundationYear;
                
                // Clear existing slides
                slider.innerHTML = '';
                
                // Generate slides for each year
                for (let i = 1; i <= years; i++) {
                    const slide = document.createElement('div');
                    slide.className = 'mini-slide';
                    slide.innerHTML = `
                        <div class="mini-number">${i}+</div>
                        <div class="mini-label">Years of Service</div>
                    `;
                    slider.appendChild(slide);
                }
                
                // If no years yet, add at least one
                if (years < 1) {
                    const slide = document.createElement('div');
                    slide.className = 'mini-slide';
                    slide.innerHTML = `
                        <div class="mini-number">1+</div>
                        <div class="mini-label">Years of Service</div>
                    `;
                    slider.appendChild(slide);
                }
            }
            
            // Initialize first slide as active
            const allSlides = slider.querySelectorAll('.mini-slide');
            if (allSlides.length > 0) {
                allSlides[0].classList.add('active');
            }
            
            // Auto-rotate slides
            let currentIndex = 0;
            setInterval(() => {
                if (allSlides.length > 1) {
                    allSlides[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % allSlides.length;
                    allSlides[currentIndex].classList.add('active');
                }
            }, 3000); // Change every 3 seconds
        });
    }

    // Testimonials slider functionality
    function initTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;
        
        const cards = slider.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('test-prev');
        const nextBtn = document.getElementById('test-next');
        const dotsContainer = document.getElementById('testimonial-dots');
        
        if (cards.length === 0) return;
        
        let currentIndex = 0;
        
        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        
        function updateSlider() {
            cards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play testimonials
        setInterval(nextSlide, 5000); // Change every 5 seconds
        
        // Initialize
        updateSlider();
    }

    // Stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    entry.target.classList.add('animated');
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }
                    }, 16);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Contact form handling with SMTP (FormSubmit)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Remove any existing messages
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                enquiry: document.getElementById('enquiry').value,
                message: document.getElementById('message').value
            };
            
            // Create form data for submission
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone || 'Not provided');
            formDataToSend.append('enquiry', formData.enquiry);
            formDataToSend.append('message', formData.message);
            formDataToSend.append('_to', 'infor@ukuphiladev.co.za');
            formDataToSend.append('_subject', `New Contact Form Submission: ${formData.enquiry}`);
            formDataToSend.append('_template', 'table');
            
            // Send email using FormSubmit (SMTP)
            fetch('https://formsubmit.co/ajax/infor@ukuphiladev.co.za', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Success
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.textContent = 'Thank you for your message! We will contact you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            })
            .catch(error => {
                // Error
                console.error('FormSubmit Error:', error);
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at infor@ukuphiladev.co.za';
                contactForm.appendChild(errorMessage);
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            });
        });
    }

    // Initialize all functionality
    initMiniSliders();
    initTestimonialSlider();
    animateStats();
});

