// Dark Mode Theme Management with TypeScript
interface ThemeConfig {
  theme: 'light' | 'dark';
  storageKey: string;
  toggleButtonId: string;
  documentAttribute: string;
}

interface ThemeIcons {
  light: string;
  dark: string;
}

class ThemeManager {
  private config: ThemeConfig;
  private icons: ThemeIcons;
  private toggleButton: HTMLElement | null;

  constructor() {
    this.config = {
      theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
      storageKey: 'theme',
      toggleButtonId: 'theme-toggle',
      documentAttribute: 'data-theme'
    };

    this.icons = {
      light: 'fas fa-moon',
      dark: 'fas fa-sun'
    };

    this.toggleButton = null;
    this.init();
  }

  private init(): void {
    // Apply saved theme
    this.applyTheme(this.config.theme);

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupToggle());
    } else {
      this.setupToggle();
    }
  }

  private setupToggle(): void {
    this.toggleButton = document.getElementById(this.config.toggleButtonId);
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
      this.updateToggleIcon();
    } else {
      console.warn(`Theme toggle button with ID '${this.config.toggleButtonId}' not found`);
    }
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute(this.config.documentAttribute, theme);
    this.config.theme = theme;
    localStorage.setItem(this.config.storageKey, theme);
  }

  private toggleTheme(): void {
    const newTheme: 'light' | 'dark' = this.config.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.updateToggleIcon();
    this.addTransitionEffect();
  }

  private updateToggleIcon(): void {
    if (this.toggleButton) {
      const icon = this.toggleButton.querySelector('i');
      if (icon) {
        icon.className = this.config.theme === 'dark' ? this.icons.dark : this.icons.light;
      }
    }
  }

  private addTransitionEffect(): void {
    document.body.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  // Public methods
  public getCurrentTheme(): 'light' | 'dark' {
    return this.config.theme;
  }

  public setTheme(theme: 'light' | 'dark'): void {
    this.applyTheme(theme);
    this.updateToggleIcon();
  }
}

// Enhanced scroll reveal configuration with TypeScript
interface ScrollRevealConfig {
  origin: string;
  distance: string;
  duration: number;
  delay: number;
  rotate: { x: number; y: number; z: number };
  opacity: number;
  scale: number;
  easing: string;
  mobile: boolean;
  reset: boolean;
  useDelay: string;
  viewFactor: number;
}

class ScrollAnimationManager {
  private sr: any; // ScrollReveal library doesn't have TS types
  private config: ScrollRevealConfig;

  constructor() {
    this.config = {
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
    };

    this.init();
  }

  private init(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.initializeScrollReveal();
      this.setupSmoothScrolling();
      this.setupImageLoadingAnimations();
    });
  }

  private initializeScrollReveal(): void {
    if (typeof (window as any).ScrollReveal !== 'undefined') {
      this.sr = (window as any).ScrollReveal(this.config);
      this.setupAnimations();
    } else {
      console.warn('ScrollReveal library not loaded');
    }
  }

  private setupAnimations(): void {
    if (!this.sr) return;

    // Reveal elements with staggered animations
    this.sr.reveal('.section-title', { delay: 300 });
    this.sr.reveal('.hero-title', { delay: 500 });
    this.sr.reveal('.hero-cta', { delay: 700 });
    this.sr.reveal('.detail-item', {
      delay: 200,
      interval: 100,
      origin: 'left'
    });
    this.sr.reveal('.project-card', {
      delay: 300,
      interval: 200
    });
  }

  private setupSmoothScrolling(): void {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((anchor: Element) => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  private setupImageLoadingAnimations(): void {
    const images = document.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      // Set initial state
      img.style.opacity = '0';
      img.style.transform = 'scale(0.9)';
      img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      });
    });
  }
}

// Initialize the managers
const themeManager = new ThemeManager();
const scrollManager = new ScrollAnimationManager();

// Export for potential external use
export { ThemeManager, ScrollAnimationManager };
