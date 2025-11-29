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

    // Program Data Object - Add your program details here
    const programData = {
        'computer-skills': {
            id: 'computer-skills',
            title: 'Computer Skills Training',
            icon: '💻',
            shortDescription: 'Essential digital literacy for the modern world',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we provide hands-on computer training designed to empower youth and community members with the digital skills needed for education, employment, and entrepreneurship. Our training covers both foundational and advanced computer competencies, ensuring that every learner is prepared for real-world opportunities.',
            whatWeTeach: [
                'Basic computer operations – typing skills, using Windows/Mac, file management, internet safety, email communication, and Microsoft Office',
                'Productivity software and workplace tools such as Word, Excel, PowerPoint, Google Workspace, and cloud storage',
                'Data analysis fundamentals, including spreadsheets, data entry, interpreting data insights, and practical applications for work and business',
                'Artificial Intelligence (AI) literacy, teaching learners how to use AI responsibly and ethically to enhance productivity and creativity—not to replace their thinking, but to support problem-solving, research, and innovation',
                'Introduction to coding and robotics, building confidence in logical thinking, programming basics, automation, and real-world problem solving',
                'Career development skills such as creating CVs, online job applications, LinkedIn profiles, and digital communication skills'
            ],
            goal: 'Our goal is to ensure that every participant becomes digitally confident, employable, and ready for the future of work. We believe technology should create opportunities, reduce unemployment, and inspire innovation—especially among the youth.',
            duration: '3-6 months',
            schedule: 'Mon-Wed, 3-6pm',
            eligibility: 'Youth and community members in Kwa-Ndengezi',
            contactInfo: 'Contact us for enrollment information'
        },
        'education-support': {
            id: 'education-support',
            title: 'Education Support',
            icon: '🎓',
            shortDescription: 'University Applications • Scholarship Assistance • Homework Tutoring',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we believe that education is the key that opens doors to a brighter and successful future. Many young people in our community have the potential to achieve great things, but lack the support and guidance needed to access opportunities. Our Education Support Program ensures that no learner is left behind.',
            whatWeProvide: [
                'Guidance with university and college applications for institutions across South Africa, including assistance with the CAO system, TVET colleges, and private colleges',
                'Scholarship and bursary support, helping students find and apply for financial aid opportunities such as NSFAS, Funza Lushaka, SETA funding, learnerships, internships, and community-based sponsorships',
                'Homework assistance and tutoring for primary and high school learners across subjects such as Mathematics, Science, Accounting, English, and Computer Studies',
                'Study skills and exam preparation techniques, improving learner confidence, time management, and academic performance',
                'Career counseling and mentorship, helping youth explore career paths, understand requirements, and make informed education decisions',
                'Support for learners without access to resources, including printing, internet access, and digital tools needed for assignments and research'
            ],
            goal: 'Our goal is to create a supportive learning environment where students feel encouraged, motivated, and equipped with everything they need to succeed. We walk the journey with them—from school to university to entering the workplace—building responsible future leaders who uplift their families and communities. Education is the foundation of change, and we are committed to empowering every learner to reach their highest potential.',
            duration: 'Ongoing',
            schedule: 'Mon-Wed, 3-6pm',
            eligibility: 'Students in primary, secondary, and tertiary education',
            contactInfo: 'Contact us for enrollment information'
        },
        'career-guidance': {
            id: 'career-guidance',
            title: 'Career Guidance',
            icon: '💼',
            shortDescription: 'Mentorship and Career Path Exploration',
            fullDescription: 'Choosing the right career path can be overwhelming, especially for young people who do not have access to information, role models, or proper guidance. At Ukuphila KwakaNdengezi Development, we walk alongside youth as they discover their strengths, passions, and future goals. Our Career Guidance program ensures that every young person is empowered to make informed decisions about their future.',
            whatWeProvide: [
                'One-on-one and group mentorship sessions led by professionals, industry experts, and community leaders who inspire and guide young people through real-world experience',
                'Career path exploration, helping youth understand various fields such as IT, engineering, finance, social sciences, healthcare, skilled trades, entrepreneurship, and more',
                'Career assessments and skills evaluations that help identify talents, interests, and suitable career trajectories',
                'Work readiness training, including CV writing, job application assistance, LinkedIn profile building, interviewing techniques, email etiquette, and workplace behavior',
                'Exposure to job shadowing opportunities, volunteering, internships, and learnership programs that provide practical workplace skills',
                'Entrepreneurship and self-employment support, providing training in business basics, networking, proposal development, and funding opportunities',
                'Networking opportunities and motivational talks, connecting youth with professionals who can share advice, guidance, and opportunities',
                'Digital career empowerment, teaching young people how to leverage technology responsibly—including AI tools—to support learning, creativity, and professional growth'
            ],
            goal: 'Our mentorship model builds confidence, discipline, and purpose. We believe every young person deserves the chance to dream boldly and build a future filled with possibility. With the right guidance, the next generation of leaders, innovators, and change-makers will rise from our community. Together, we transform potential into achievement.',
            duration: '6-12 months',
            schedule: 'By appointment',
            eligibility: 'Youth aged 16-30',
            contactInfo: 'Contact us for enrollment information'
        },
        'spiritual-growth': {
            id: 'spiritual-growth',
            title: 'Spiritual Growth',
            icon: '🙏',
            shortDescription: 'Bible Study & Faith-Based Mentoring to Build Character and Hope',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we believe that true transformation begins within. Our Spiritual Growth programme provides a safe and supportive space where individuals—especially youth—can build a strong foundation of faith, hope, and purpose. Through Bible study, prayer, and mentorship, we help young people grow spiritually while developing strong moral values that guide their decisions in everyday life.',
            whatWeOffer: [
                'Weekly Bible Study sessions that strengthen faith, understanding of Scripture, and spiritual discipline',
                'Faith-based mentoring, guiding youth through personal challenges, life choices, and emotional struggles using biblical principles and encouragement',
                'Character development, focusing on respect, responsibility, honesty, compassion, forgiveness, and leadership rooted in Christian values',
                'Group discussions and peer support circles, creating a sense of belonging, fellowship, and unity within the community',
                'Spiritual coaching for personal growth, helping individuals discover their God-given gifts and purpose',
                'Motivational youth services and workshops, empowering young people to rise above adversity and build a hopeful future grounded in faith',
                'Community prayer meetings, fostering healing, restoration, and unity among families'
            ],
            goal: 'We believe that nurturing spiritual wellness strengthens mental, emotional, and social wellbeing. When young people know their identity in Christ, they gain the courage to overcome challenges and achieve their dreams. Our goal is to equip them to become strong leaders, compassionate citizens, and agents of positive change in their community. Together, we build faith, hope, and a future filled with purpose.',
            duration: 'Ongoing',
            schedule: 'Fri, 6-7:30pm',
            eligibility: 'Open to all community members',
            contactInfo: 'Contact us for more information'
        },
        'youth-empowerment': {
            id: 'youth-empowerment',
            title: 'Youth Empowerment',
            icon: '🧑‍🎓',
            shortDescription: 'We empower youth of Kwa-Ndengezi through skills development on various areas of life',
            fullDescription: 'Our comprehensive Youth Empowerment program addresses multiple aspects of youth development including life skills, leadership training, personal development, and community engagement.',
            benefits: [
                'Life skills training',
                'Leadership development',
                'Personal growth workshops',
                'Community service opportunities',
                'Peer support networks'
            ],
            duration: 'Ongoing',
            schedule: 'Mon-Wed, 3-6pm',
            eligibility: 'Youth aged 13-25',
            contactInfo: 'Contact us for enrollment information'
        },
        'women-empowerment': {
            id: 'women-empowerment',
            title: 'Women Empowerment',
            icon: '👩‍💼',
            shortDescription: 'Business training, emotional support, and small group circles for women.',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we are passionate about empowering women to become financially independent and confident leaders within their communities. Our comprehensive Women Empowerment program includes business training, emotional support, small group circles, and spiritual encouragement.',
            programs: [
                {
                    title: 'Business Training',
                    description: 'Practical skills in entrepreneurship, financial management, and business development for women starting small businesses. Our programme covers entrepreneurship fundamentals, business planning and strategy, financial management training, access to funding opportunities, marketing and digital marketing skills, sales skills and negotiation, business compliance and registration, mentorship and networking, and practical workshops and hands-on exercises. Our goal is to empower women to create sustainable income, support their families, and uplift the community through economic participation.'
                },
                {
                    title: 'Emotional Support',
                    description: 'Safe spaces for women to share challenges, receive counseling, and build supportive relationships. We offer support groups & healing circles, one-on-one counseling sessions, workshops on self-esteem and confidence building, trauma-informed healing practices, referrals to professional services, peer mentorship programmes, and awareness sessions on mental health. Our mission is to restore hope, dignity, and emotional strength—enabling women to rebuild their lives, pursue opportunities, and make positive decisions for themselves and their families.'
                },
                {
                    title: 'Small Group Circles',
                    description: 'Intimate gatherings where women connect, share experiences, and grow together in faith and resilience. Within these circles, women are encouraged to share personal stories, receive guidance and prayer support, learn practical coping skills, rebuild self-esteem, discover a sense of belonging, and grow spiritually through Bible-based reflection and mentorship.'
                },
                {
                    title: 'Spiritual Encouragement',
                    description: 'Bible studies and prayer groups that provide spiritual foundation and hope for daily challenges. Through weekly Bible studies, prayer groups, and faith-based mentoring, participants gain guidance and spiritual grounding, encouragement and emotional healing, a deeper understanding of purpose and identity, community support, and strength to face real-life struggles. We believe that by building strong spiritual foundations, we are shaping leaders, strengthening families, and contributing to a healthier and more compassionate community.'
                }
            ],
            duration: 'Ongoing',
            schedule: 'Thu, 10am-12pm',
            eligibility: 'Women in Kwa-Ndengezi community',
            contactInfo: 'Contact us for enrollment information'
        },
        'business-training': {
            id: 'business-training',
            title: 'Business Training',
            icon: '💼',
            shortDescription: 'Practical skills in entrepreneurship, financial management, and business development for women starting small businesses',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we are passionate about empowering women to become financially independent and confident leaders within their communities. Our Business Training programme equips aspiring and existing female entrepreneurs with practical, real-world skills to start, manage, and scale successful small businesses.',
            whatWeCover: [
                'Entrepreneurship fundamentals – turning ideas into viable business opportunities and identifying profitable markets',
                'Business planning and strategy, including product development, pricing, branding, and customer service',
                'Financial management training, teaching budgeting, bookkeeping, cost control, savings, and profit tracking',
                'Access to funding opportunities, including guidance on loan applications, grants, and government support programmes',
                'Marketing and digital marketing skills, including social media promotion and customer engagement',
                'Sales skills and negotiation, helping women communicate confidently and grow revenue',
                'Business compliance and registration, helping participants register businesses, understand tax requirements, and operate legally',
                'Mentorship and networking, connecting women with experienced business leaders and peer support groups',
                'Practical workshops and hands-on exercises, ensuring real-life application of all knowledge gained'
            ],
            goal: 'Our goal is to empower women to create sustainable income, support their families, and uplift the community through economic participation. When women succeed in business, the entire community grows — financially, socially, and generationally. We believe in building confident entrepreneurs who break barriers, create jobs, and rewrite the story of poverty into a story of opportunity and success. Join us and transform your business dream into reality.',
            duration: 'Ongoing',
            schedule: 'Thu, 10am-12pm',
            eligibility: 'Women in Kwa-Ndengezi community',
            contactInfo: 'Contact us for enrollment information'
        },
        'emotional-support': {
            id: 'emotional-support',
            title: 'Emotional Support',
            icon: '❤',
            shortDescription: 'Safe spaces for women to share challenges, receive counseling, and build supportive relationships.',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we understand that emotional well-being is a critical part of healing, confidence, and personal growth. Many women in our communities face overwhelming pressures — including unemployment, trauma, gender-based violence, financial stress, and lack of support systems. Our Emotional Support programme creates a safe and confidential environment where women can speak openly, feel heard, and receive the compassionate support they deserve.',
            initiatives: [
                'Support groups & healing circles that allow women to share their experiences, learn from one another, and realize they are not alone',
                'One-on-one counseling sessions with trained counsellors and professionals who provide emotional guidance and mental well-being support',
                'Workshops on self-esteem, confidence building, and stress management, equipping women with tools to overcome emotional barriers',
                'Trauma-informed healing practices designed especially for victims of abuse and gender-based violence',
                'Referrals to professional services for cases requiring specialized psychological or legal assistance',
                'Peer mentorship programmes that create long-term supportive friendships and connections within the community',
                'Awareness sessions on mental health, healthy relationships, self-care, and empowerment'
            ],
            goal: 'Our mission is to restore hope, dignity, and emotional strength — enabling women to rebuild their lives, pursue opportunities, and make positive decisions for themselves and their families. When women heal, communities are transformed.',
            duration: 'Ongoing',
            schedule: 'By appointment',
            eligibility: 'Women in Kwa-Ndengezi community',
            contactInfo: 'Contact us for enrollment information'
        },
        'small-group-circles': {
            id: 'small-group-circles',
            title: 'Small Group Circles',
            icon: '👥',
            shortDescription: 'Intimate gatherings where women connect, share experiences, and grow together in faith and resilience.',
            fullDescription: 'Our Small Group Circles are designed to create a warm, supportive environment where women can build authentic relationships and find strength in community. These gatherings provide a safe, confidential space to discuss real-life challenges, celebrate victories, and support one another emotionally, spiritually, and socially.',
            whatWeEncourage: [
                'Share personal stories and life experiences without fear of judgment',
                'Receive guidance, encouragement, and prayer support grounded in faith',
                'Learn practical coping skills to handle stress, trauma, and daily challenges',
                'Rebuild self-esteem and inner confidence',
                'Discover a sense of belonging and sisterhood',
                'Grow spiritually through Bible-based reflection and mentorship'
            ],
            goal: 'Each session is led by trained facilitators who create an atmosphere of love, trust, and empowerment, ensuring that every woman\'s voice matters. Through these intimate gatherings, many participants rediscover their identity, purpose, and God-given potential. Together, we heal. Together, we rise.',
            duration: 'Ongoing',
            schedule: 'Thu, 10am-12pm',
            eligibility: 'Women in Kwa-Ndengezi community',
            contactInfo: 'Contact us for enrollment information'
        },
        'spiritual-encouragement': {
            id: 'spiritual-encouragement',
            title: 'Spiritual Encouragement',
            icon: '🙏',
            shortDescription: 'Bible studies and prayer groups that provide spiritual foundation and hope for daily challenges.',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we believe that true transformation begins from within. Our Spiritual Encouragement programme offers a nurturing environment where community members—especially youth and women—can grow in faith, develop strong values, and build resilience through biblical principles.',
            whatParticipantsGain: [
                'Guidance and spiritual grounding to navigate life with wisdom and strength',
                'Encouragement and emotional healing through shared scripture and fellowship',
                'A deeper understanding of purpose, identity, and calling',
                'Community support that promotes hope, unity, and love',
                'Strength to face real-life struggles, including addiction, family pressure, unemployment, and emotional pain'
            ],
            goal: 'These sessions create a safe place where individuals can express their struggles, ask questions, grow spiritually, and find a renewed sense of direction. We believe that by building strong spiritual foundations, we are shaping leaders, strengthening families, and contributing to a healthier and more compassionate community. Faith is the anchor that helps us rise above challenges.',
            duration: 'Ongoing',
            schedule: 'Fri, 6-7:30pm',
            eligibility: 'Open to all community members',
            contactInfo: 'Contact us for more information'
        },
        'food-parcel-distribution': {
            id: 'food-parcel-distribution',
            title: 'Food Parcel Distribution',
            icon: '🛒',
            shortDescription: 'Regular distribution of nutritious food parcels to families facing food insecurity in our community.',
            fullDescription: 'Our Food Parcel Distribution Programme is one of the core initiatives that directly supports vulnerable households within KwaNdengezi and surrounding communities. Many families face daily challenges caused by unemployment, poverty, and lack of consistent access to nutritious meals. As a result, children often go to school hungry and families struggle to maintain dignity and stability.',
            priorities: [
                'Child-headed households',
                'Unemployed parents',
                'Elderly community members',
                'People living with chronic illnesses',
                'Single mothers and GBV survivors'
            ],
            whatWeInclude: 'Each food parcel includes essential items such as maize meal, rice, beans, cooking oil, vegetables, toiletries, and other basic necessities, ensuring families can cook balanced meals and meet daily nutritional needs.',
            goals: [
                'Fight hunger and reduce malnutrition',
                'Improve overall family well-being',
                'Enable children to attend school with energy and focus',
                'Restore dignity, hope, and community care',
                'Reduce the stress burden on struggling households'
            ],
            support: 'Our programme is currently supported through community contributions, small business income, and individual donors, and we are actively partnering with supermarkets, corporates, and NGOs to expand our reach.',
            goal: 'No family should ever go to bed hungry — together, we can make that a reality.',
            duration: 'Ongoing',
            schedule: 'Regular distributions',
            eligibility: 'Vulnerable households in Kwa-Ndengezi and surrounding communities',
            contactInfo: 'Contact us for more information or to request support'
        },
        'hiv-counselling': {
            id: 'hiv-counselling',
            title: 'HIV Counselling & Education',
            icon: '🏥',
            shortDescription: 'Confidential counselling, testing referrals, and education to combat HIV stigma and promote health.',
            fullDescription: 'Our HIV Counselling & Education Programme provides compassionate, confidential, and community-centered support for individuals and families affected by HIV/AIDS. Many people in our community still face stigma, fear, and misinformation related to HIV, which prevents them from seeking testing or treatment and places their well-being at risk.',
            whatWeOffer: [
                'Confidential one-on-one counselling for individuals dealing with new or ongoing diagnoses',
                'Referrals to professional testing and medical care through trusted local clinics and health partners',
                'Educational workshops on prevention, treatment options, and healthy living',
                'Support groups that create a safe space for emotional sharing, healing, and encouragement',
                'Awareness campaigns to fight stigma and promote community understanding',
                'Youth engagement programs to teach responsible choices and reduce new infections'
            ],
            goals: [
                'Increasing early testing and treatment adherence',
                'Reducing stigma and discrimination',
                'Supporting emotional and mental health for affected families',
                'Promoting awareness and prevention among youth and adults'
            ],
            approach: 'This programme is guided by trained counsellors and volunteers committed to respecting each person\'s dignity, privacy, and confidentiality.',
            goal: 'We believe that HIV is not a death sentence, and with the right support, individuals can live healthy, purposeful, and empowered lives.',
            duration: 'Ongoing',
            schedule: 'By appointment',
            eligibility: 'Open to all community members',
            contactInfo: 'Contact us for confidential support and information'
        },
        'spiritual-support': {
            id: 'spiritual-support',
            title: 'Spiritual Support',
            icon: '🙏',
            shortDescription: 'Bible study groups and spiritual guidance for individuals and families seeking hope and direction.',
            fullDescription: 'Our Spiritual Support Programme serves as a foundation of hope, healing, and restoration for individuals and families facing life\'s challenges. We believe that spiritual growth contributes to emotional strength, healthy decision-making, and strong community relationships.',
            whatWeProvide: [
                'Weekly Bible Study groups for youth, women, and families',
                'Faith-based mentorship that encourages personal growth, discipline, and character development',
                'Prayer support circles where individuals can receive encouragement and spiritual counselling',
                'Workshops on purpose, identity, and resilience',
                'Family sessions that strengthen unity, communication, and values grounded in faith',
                'Motivational and inspirational sessions with community and church leaders'
            ],
            whatWeCreate: [
                'People can share openly without judgement',
                'Young people learn positive values and moral leadership',
                'Women and men rediscover hope, courage, and self-worth',
                'Families build a stronger foundation rooted in faith'
            ],
            goal: 'We believe that faith transforms communities, and when people find spiritual strength, they become better equipped to face life with confidence, hope, and purpose.',
            duration: 'Ongoing',
            schedule: 'Various times - Weekly sessions',
            eligibility: 'Open to all community members - youth, women, and families',
            contactInfo: 'Contact us for more information'
        },
        'community-partnerships': {
            id: 'community-partnerships',
            title: 'Community Partnerships',
            icon: '🤝',
            shortDescription: 'Collaboration with local churches, schools, and businesses to maximize our impact in Kwa-Ndengezi and surrounding areas.',
            fullDescription: 'At Ukuphila KwakaNdengezi Development, we believe that sustainable community transformation is achieved when organizations work together toward a shared vision. Our Community Partnerships Programme strengthens collaboration and builds strategic relationships with key stakeholders who are committed to uplifting youth, empowering women, and improving community wellbeing.',
            whoWeWorkWith: [
                'Local schools to support education, tutoring, career guidance, and university funding applications',
                'Local churches and faith communities to provide spiritual guidance, counselling, and volunteer support',
                'Businesses and corporate partners to secure sponsorships, workplace exposure, internship opportunities, and resources for community development',
                'Health and social service organizations to deliver humanitarian support including food parcels, HIV awareness, and counselling',
                'Community leaders and government departments to align development initiatives and strengthen service delivery'
            ],
            whatWeAchieve: [
                'Expand the reach of our programmes and increase the number of beneficiaries',
                'Access resources, funding, and expertise that improve community impact',
                'Create employment and skills development opportunities for youth and women',
                'Promote unity, shared responsibility, and collective transformation',
                'Ensure long-term sustainability and measurable community growth'
            ],
            goal: 'We believe that when we work together, we build a stronger Kwa-Ndengezi, where every person has access to opportunity, dignity, and hope. Join Us — Partner for Impact.',
            duration: 'Ongoing',
            schedule: 'By arrangement',
            eligibility: 'Churches, schools, businesses, NGOs, and community organizations',
            contactInfo: 'Contact us to become a partner and make an impact'
        },
        'income-projects': {
            id: 'income-projects',
            title: 'Income Projects',
            icon: '🛒',
            shortDescription: 'Sustainable businesses including landscaping and salon services.',
            fullDescription: 'Our Income Projects program creates sustainable economic opportunities through community businesses including landscaping services, salon services, and community markets.',
            benefits: [
                'Employment opportunities',
                'Business skills training',
                'Income generation',
                'Community economic development',
                'Sustainable business models'
            ],
            duration: 'Ongoing',
            schedule: 'Various times',
            eligibility: 'Community members interested in entrepreneurship',
            contactInfo: 'Contact us for service requests or business opportunities'
        }
    };

    // Function to render program details dynamically
    function renderProgramDetails() {
        // Get program ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const programId = urlParams.get('id');
        
        const container = document.getElementById('program-details-container');
        
        if (!container) return; // Not on program details page
        
        if (!programId || !programData[programId]) {
            // Program not found
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 0;">
                    <div class="program-icon" style="font-size: 4rem; margin-bottom: 1rem;">❌</div>
                    <h2 class="section-title">Program Not Found</h2>
                    <p class="section-subtitle">The program you're looking for doesn't exist.</p>
                    <a href="index.html" class="cta-primary" style="margin-top: 2rem; display: inline-block;">Return to Home</a>
                </div>
            `;
            return;
        }
        
        const program = programData[programId];
        
        // Determine which list property exists and its label
        let listItems = [];
        let listTitle = 'Program Details';
        
        if (program.whatWeTeach) {
            listItems = program.whatWeTeach;
            listTitle = 'We Teach';
        } else if (program.whatWeProvide) {
            listItems = program.whatWeProvide;
            listTitle = 'We Provide';
        } else if (program.whatWeCover) {
            listItems = program.whatWeCover;
            listTitle = 'Our Programme Covers';
        } else if (program.initiatives) {
            listItems = program.initiatives;
            listTitle = 'Our Support Initiatives';
        } else if (program.whatWeEncourage) {
            listItems = program.whatWeEncourage;
            listTitle = 'What We Encourage';
        } else if (program.whatParticipantsGain) {
            listItems = program.whatParticipantsGain;
            listTitle = 'What Participants Gain';
        } else if (program.priorities) {
            listItems = program.priorities;
            listTitle = 'We Prioritise';
        } else if (program.whatWeOffer) {
            listItems = program.whatWeOffer;
            listTitle = 'We Offer';
        } else if (program.goals && Array.isArray(program.goals)) {
            listItems = program.goals;
            listTitle = 'Our Goals';
        } else if (program.whoWeWorkWith) {
            listItems = program.whoWeWorkWith;
            listTitle = 'We Work Closely With';
        } else if (program.benefits) {
            listItems = program.benefits;
            listTitle = 'Program Benefits';
        }
        
        // Build the list HTML - handle multiple lists
        let listHTML = '';
        
        // Primary list
        if (listItems.length > 0) {
            listHTML = `
                <div class="program-card" style="margin-bottom: 2rem;">
                    <h3 style="color: var(--teal); margin-bottom: 1rem; font-size: 1.5rem;">${listTitle}</h3>
                    <ul style="text-align: left; line-height: 2; padding-left: 1.5rem;">
                        ${listItems.map(item => `<li style="margin-bottom: 0.8rem;">${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Additional lists for programs with multiple sections
        if (program.whatWeCreate && program.whatWeCreate.length > 0) {
            listHTML += `
                <div class="program-card" style="margin-bottom: 2rem;">
                    <h3 style="color: var(--teal); margin-bottom: 1rem; font-size: 1.5rem;">Our Spiritual Gatherings Create</h3>
                    <ul style="text-align: left; line-height: 2; padding-left: 1.5rem;">
                        ${program.whatWeCreate.map(item => `<li style="margin-bottom: 0.8rem;">${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (program.whatWeAchieve && program.whatWeAchieve.length > 0) {
            listHTML += `
                <div class="program-card" style="margin-bottom: 2rem;">
                    <h3 style="color: var(--teal); margin-bottom: 1rem; font-size: 1.5rem;">Through These Collaborations</h3>
                    <ul style="text-align: left; line-height: 2; padding-left: 1.5rem;">
                        ${program.whatWeAchieve.map(item => `<li style="margin-bottom: 0.8rem;">${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Build additional info sections
        let additionalInfo = '';
        
        if (program.whatWeInclude) {
            additionalInfo += `
                <div class="program-card" style="margin-bottom: 2rem;">
                    <h3 style="color: var(--teal); margin-bottom: 1rem;">What We Include</h3>
                    <p>${program.whatWeInclude}</p>
                </div>
            `;
        }
        
        if (program.support) {
            additionalInfo += `
                <div class="program-card" style="margin-bottom: 2rem;">
                    <h3 style="color: var(--teal); margin-bottom: 1rem;">Programme Support</h3>
                    <p>${program.support}</p>
                </div>
            `;
        }
        
        if (program.approach) {
            additionalInfo += `
                <div class="program-card" style="margin-bottom: 2rem;">
                    <h3 style="color: var(--teal); margin-bottom: 1rem;">Our Approach</h3>
                    <p>${program.approach}</p>
                </div>
            `;
        }
        
        // Render program details
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <div class="program-icon" style="font-size: 5rem; margin-bottom: 1.5rem;">${program.icon}</div>
                    <h1 class="section-title">${program.title}</h1>
                    <p class="section-subtitle" style="font-size: 1.2rem; margin-top: 1rem;">${program.shortDescription}</p>
                </div>
                
                <div style="background: var(--soft-mint); padding: 2rem; border-radius: var(--border-radius); margin-bottom: 2rem;">
                    <h2 class="section-title" style="font-size: 1.8rem; margin-bottom: 1rem;">About This Program</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--deep-teal); white-space: pre-line;">${program.fullDescription}</p>
                </div>
                
                ${listHTML}
                ${additionalInfo}
                
                ${program.goal ? `
                    <div style="background: linear-gradient(135deg, var(--teal) 0%, var(--deep-teal) 100%); color: white; padding: 2rem; border-radius: var(--border-radius); margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Our Goal</h3>
                        <p style="font-size: 1.1rem; line-height: 1.8; white-space: pre-line;">${program.goal}</p>
                    </div>
                ` : ''}
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                    <div class="program-card">
                        <h3 style="color: var(--teal); margin-bottom: 1rem;">Program Information</h3>
                        <p><strong>Duration:</strong> ${program.duration}</p>
                        <p><strong>Schedule:</strong> ${program.schedule}</p>
                        <p><strong>Eligibility:</strong> ${program.eligibility}</p>
                    </div>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: white; border-radius: var(--border-radius); box-shadow: var(--shadow);">
                    <h3 style="color: var(--deep-teal); margin-bottom: 1rem;">Get Involved</h3>
                    <p style="margin-bottom: 1.5rem;">${program.contactInfo}</p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="index.html#contact" class="cta-primary">Contact Us</a>
                        <a href="index.html#home" class="cta-secondary">Back to Home</a>
                    </div>
                </div>
            </div>
        `;
        
        // Update page title
        document.title = `${program.title} - Ukuphila KwakaNdengezi Development`;
    }

    // Initialize all functionality
    initMiniSliders();
    initTestimonialSlider();
    animateStats();
    
    // Render program details if on program details page
    renderProgramDetails();
});

