export class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    this.createLightboxElement();
    this.initializePortfolioButtons();
    this.initializeControls();
  }

  createLightboxElement() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption">
          <h3></h3>
          <p></p>
        </div>
        <button class="lightbox-close">&times;</button>
        <div class="lightbox-loader"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    this.lightbox = lightbox;
    this.image = lightbox.querySelector('.lightbox-image');
    this.caption = lightbox.querySelector('.lightbox-caption');
    this.loader = lightbox.querySelector('.lightbox-loader');

    this.image.addEventListener('click', () => this.openInNewWindow());
  }

  initializePortfolioButtons() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    this.images = Array.from(portfolioItems).map(item => ({
      src: item.querySelector('img').src,
      caption: item.querySelector('h3').textContent,
      description: item.querySelector('p').textContent
    }));

    portfolioItems.forEach((item, index) => {
      const viewButton = item.querySelector('.button-shimmer');
      const image = item.querySelector('img');

      if (viewButton) {
        if (viewButton.classList.contains('external-link')) {
          // Przeniesienie na inną stronę
          viewButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Zapobiega aktywowaniu lightboxa
            const url = viewButton.dataset.href || 'https://example.com'; // Pobiera URL z data-href
            window.location.href = url;
          });
        } else {
          // Otwieranie w lightboxie
          viewButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.open(index);
          });
        }
      }

      if (image) {
        // Otwieranie obrazu w lightboxie
        image.addEventListener('click', (e) => {
          e.preventDefault();
          this.open(index);
        });
      }
    });
  }

  initializeControls() {
    this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;

      switch (e.key) {
        case 'Escape':
          this.close();
          break;
        // Usunięcie kontroli klawiszy na poprzedni/następny obraz
      }
    });
  }

  open(index) {
    this.currentIndex = index;
    this.loadImage(this.images[index].src);
    this.updateCaption();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  loadImage(src) {
    this.loader.style.display = 'block';
    this.image.style.opacity = '0';

    const img = new Image();
    img.onload = () => {
      this.image.src = src;
      this.image.style.opacity = '1';
      this.loader.style.display = 'none';
    };
    img.src = src;
  }

  updateCaption() {
    const { caption, description } = this.images[this.currentIndex];
    this.caption.innerHTML = `
      <h3>${caption}</h3>
      <p>${description}</p>
    `;
  }

  openInNewWindow() {
    const src = this.images[this.currentIndex].src;
    window.open(src, '_blank');
  }
}
