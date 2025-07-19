// Main application entry point with TypeScript
import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import "./theme";

// Type definitions for better code organization
interface AppConfig {
  scrollReveal: boolean;
  tiltEffect: boolean;
  theme: boolean;
}

class Application {
  private config: AppConfig;

  constructor() {
    this.config = {
      scrollReveal: true,
      tiltEffect: true,
      theme: true
    };

    this.init();
  }

  private init(): void {
    this.initializeFeatures();
  }

  private initializeFeatures(): void {
    try {
      // Initialize scroll reveal animations
      if (this.config.scrollReveal) {
        initScrollReveal(targetElements, defaultProps);
      }

      // Initialize tilt effects
      if (this.config.tiltEffect) {
        initTiltEffect();
      }

      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }
}

// Initialize the application
new Application();
