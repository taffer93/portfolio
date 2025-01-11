import { BackgroundAnimation } from './js/animation.js';
import { Lightbox } from './js/components/Lightbox.js';
import { Navigation } from './js/components/Navigation.js';
import { Loader } from './js/components/Loader.js';

// Initialize loader first
new Loader();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize other components after DOM is ready
  new BackgroundAnimation('.background-canvas');
  new Lightbox();
  new Navigation();
});

// ID kontenera galerii i nawigacji
const portfolioGrid = document.getElementById('portfolio-grid');
const pagination = document.getElementById('pagination');

// Kopia Twojej galerii
const galleryItems = portfolioGrid.innerHTML; 

// Funkcja do przełączania stron
function switchPage(page) {
  // Wyczyść galerię przed załadowaniem
  portfolioGrid.innerHTML = '';

  if (page === 1) {
    // Wyświetl pierwszą stronę
    portfolioGrid.innerHTML = galleryItems;
  } else if (page === 2) {
    // Wyświetl drugą stronę (może być taka sama jak pierwsza)
    portfolioGrid.innerHTML = galleryItems;
  }
}

// Funkcja tworząca przyciski nawigacji
function setupPagination() {
  pagination.innerHTML = '';

  // Tworzenie przycisków
  const buttonPage1 = document.createElement('button');
  buttonPage1.textContent = '1';
  buttonPage1.classList.add('pagination-button');
  buttonPage1.addEventListener('click', () => switchPage(1));

  const buttonPage2 = document.createElement('button');
  buttonPage2.textContent = '2';
  buttonPage2.classList.add('pagination-button');
  buttonPage2.addEventListener('click', () => switchPage(2));

  // Dodaj przyciski do nawigacji
  pagination.appendChild(buttonPage1);
  pagination.appendChild(buttonPage2);
}

// Inicjalizacja galerii i nawigacji
document.addEventListener('DOMContentLoaded', () => {
  setupPagination();
  switchPage(1); // Domyślnie pokaż pierwszą stronę
});
