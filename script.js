// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const endpoint = contactForm.getAttribute('action');
        const statusEl = document.getElementById('formStatus');
        const submitBtn = document.getElementById('contactSubmitBtn');

        if (!endpoint || endpoint.includes('yourFormId')) {
            if (statusEl) {
                statusEl.textContent = 'Formspree is not configured yet. Replace yourFormId with your Formspree form ID.';
                statusEl.className = 'form-status error';
            }
            return;
        }

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        const replyToField = document.getElementById('replyToField');
        const subjectField = document.getElementById('formSubject');
        if (replyToField) {
            replyToField.value = email;
        }
        if (subjectField && name) {
            subjectField.value = `New Website Enquiry from ${name}`;
        }
        formData.set('_replyto', email);
        if (name) {
            formData.set('_subject', `New Website Enquiry from ${name}`);
        }

        if (!name || !email || !message) {
            if (statusEl) {
                statusEl.textContent = 'Please fill in Name, Email, and Message.';
                statusEl.className = 'form-status error';
            }
            return;
        }

        if (statusEl) {
            statusEl.textContent = 'Sending your message...';
            statusEl.className = 'form-status';
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                contactForm.reset();
                if (statusEl) {
                    statusEl.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    statusEl.className = 'form-status success';
                }
            } else {
                let errorMessage = 'Something went wrong. Please try again.';
                try {
                    const data = await response.json();
                    if (data && data.errors && data.errors.length > 0 && data.errors[0].message) {
                        errorMessage = data.errors[0].message;
                    }
                } catch (parseError) {
                    // Keep fallback error message when response is not JSON.
                }
                if (statusEl) {
                    statusEl.textContent = errorMessage;
                    statusEl.className = 'form-status error';
                }
            }
        } catch (error) {
            if (statusEl) {
                statusEl.textContent = 'Network error. Please check your connection and try again.';
                statusEl.className = 'form-status error';
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.55)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.6)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// Animate on Load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add parallax effect to shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const moveX = (e.clientX / window.innerWidth) * 20 - 10;
        const moveY = (e.clientY / window.innerHeight) * 20 - 10;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Counter Animation for Stats
const counters = document.querySelectorAll('.stat h3');
const speed = 200;

const runCounter = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / speed;
        let count = 0;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count) + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = counter.innerText;
            }
        };

        // Only run once when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counter.dataset.counted) {
                counter.dataset.counted = 'true';
                updateCount();
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });
};

runCounter();

// Scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        document.body.style.cursor = 'pointer';
    }
});

// Add smooth transitions on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
    
    // Add active class to current sec when refresh
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
});