import { vantaConfig } from './config/vantaConfig.js';
import { checkWebGLSupport, handleError, waitForDependencies } from './utils/animationUtils.js';

export class BackgroundAnimation {
  constructor(elementSelector = '.background-canvas') {
    this.elementSelector = elementSelector;
    this.element = document.querySelector(elementSelector);
    this.effect = null;
    this.initialize();
  }

  async initialize() {
    try {
      // Wait for dependencies to load
      await waitForDependencies();
      
      if (this.validateEnvironment()) {
        this.init();
      }
    } catch (error) {
      handleError('Failed to initialize animation:', error);
    }
  }

  validateEnvironment() {
    if (!this.element) {
      handleError('Background canvas element not found');
      return false;
    }

    if (!checkWebGLSupport()) {
      handleError('WebGL is not supported');
      return false;
    }

    if (typeof VANTA === 'undefined') {
      handleError('VANTA is not loaded');
      return false;
    }

    return true;
  }

  init() {
    try {
      this.effect = VANTA.NET({
        el: this.element,
        ...vantaConfig
      });

      this.setupEventListeners();
    } catch (error) {
      handleError('Failed to initialize background animation', error);
    }
  }

  setupEventListeners() {
    window.addEventListener('beforeunload', () => this.cleanup());
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    if (this.effect && this.effect.resize) {
      this.effect.resize();
    }
  }

  cleanup() {
    if (this.effect && this.effect.destroy) {
      this.effect.destroy();
      this.effect = null;
    }
  }
}