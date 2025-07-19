// Dark Mode Toggle Functionality
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.toggleButton = null;
    this.init();
  }

  init() {
    // Apply saved theme
    this.applyTheme(this.theme);

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupToggle());
    } else {
      this.setupToggle();
    }
  }

  setupToggle() {
    this.toggleButton = document.getElementById('theme-toggle');
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
      this.updateToggleIcon();
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme = theme;
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateToggleIcon();

    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  updateToggleIcon() {
    if (this.toggleButton) {
      const icon = this.toggleButton.querySelector('i');
      if (icon) {
        if (this.theme === 'dark') {
          icon.className = 'fas fa-sun';
        } else {
          icon.className = 'fas fa-moon';
        }
      }
    }
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Enhanced scroll reveal configuration
window.addEventListener('DOMContentLoaded', () => {
  // Initialize ScrollReveal with enhanced settings
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 1000,
      delay: 200,
      rotate: { x: 0, y: 0, z: 0 },
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      mobile: true,
      reset: false,
      useDelay: 'always',
      viewFactor: 0.2,
    });

    // Reveal elements with staggered animations
    sr.reveal('.section-title', { delay: 300 });
    sr.reveal('.hero-title', { delay: 500 });
    sr.reveal('.hero-cta', { delay: 700 });
    sr.reveal('.about-wrapper__info-text', {
      delay: 200,
      interval: 100,
      origin: 'left'
    });
    sr.reveal('.project-wrapper__text', {
      delay: 300,
      origin: 'left'
    });
    sr.reveal('.project-wrapper__image', {
      delay: 400,
      origin: 'right'
    });
  }

  // Add smooth scrolling for anchor links
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

  // Add loading animation to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });

    // Set initial state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
