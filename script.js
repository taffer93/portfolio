import { BackgroundAnimation } from './js/animation.js';
import { Lightbox } from './js/components/Lightbox.js';
import { Navigation } from './js/components/Navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize background animation
  new BackgroundAnimation('.background-canvas');

  // Initialize other components
  new Lightbox();
  new Navigation();
});