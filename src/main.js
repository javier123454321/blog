import './styles/main.css';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

const env = document.querySelector('body').dataset.env;

// Check that service workers are supported
if ('serviceWorker' in navigator && env === 'production') {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service worker registration failed: ', error);
    }
  });
}
(function checkForTrailingSlashes() {
  if (!window.location.pathname.endsWith('/')) {
    if (window.location.pathname.split('.')[1] === 'html') {
      return;
    } else if (window.location.pathname.split('?').length > 1) {
      return;
    } else if (window.location.pathname.split('#').length > 1) {
      return;
    } else {
      window.location.href = `${window.location.href}/`;
    }
  }
})();
