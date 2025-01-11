export class Loader {
  constructor() {
    this.loader = null;
    this.init();
  }

  init() {
    this.createLoader();
    this.handlePageLoad();
  }

  createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader-container';
    loader.innerHTML = '<span class="loader"></span>';
    document.body.appendChild(loader);
    this.loader = loader;
  }

  handlePageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideLoader();
      }, 500); // Short delay for smooth transition
    });
  }

  hideLoader() {
    this.loader.classList.add('hidden');
    setTimeout(() => {
      this.loader.remove();
    }, 500); // Match transition duration
  }
}