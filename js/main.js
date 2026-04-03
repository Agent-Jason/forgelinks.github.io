/* ============================================
   FORGE LINK — Main JavaScript
   ============================================ */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    // Only remove on homepage (other pages keep it always scrolled)
    if (document.querySelector('.hero')) {
      navbar.classList.remove('scrolled');
    }
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- Scroll fade-in animations ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- Contact form handling (basic) ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // If using Formspree or similar, let it handle the submission.
    // If no backend is configured, show a local confirmation.
    const action = contactForm.getAttribute('action');
    if (action && action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Received!';
      btn.style.background = '#10b981';
      btn.disabled = true;

      // Show a simple confirmation
      const msg = document.createElement('p');
      msg.textContent = 'Thanks for your interest! This is a demo form — in production, connect it to Formspree, Netlify Forms, or your email backend.';
      msg.style.cssText = 'color: #10b981; margin-top: 16px; font-weight: 600;';
      contactForm.appendChild(msg);
    }
  });
}
