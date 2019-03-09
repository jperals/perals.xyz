(function lightbox() {

  const imageSelector = '.enlarge';
  const lightboxId = 'lightbox';
  const lightboxImageClass = 'lightbox-image';
  const withLightboxClass = 'with-lightbox';

  window.addEventListener('DOMContentLoaded',
    function() {
      initLightbox();
      initElements();
    });

  function initLightbox() {
  }

  function initElements() {
    const elements = document.querySelectorAll(imageSelector);
    for (const element of elements) {
      element.addEventListener('click', function () {
        openLightbox(element)
      })
    }
  }

  function openLightbox(imageElement) {
    if (imageElement.src) {
      const lightbox = getLightbox();
      setTimeout(() => {
        lightbox.style.opacity = '1';
      }, 0);
      lightbox.addEventListener('click', closeLightbox);
      const lightboxImage = getLightboxImage()
      lightboxImage.style.backgroundImage = `url(${imageElement.src})`;
      document.body.classList.add(withLightboxClass);
    }
  }

  function getLightbox() {
    let lightbox = document.querySelector('#' + lightboxId)
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = lightboxId;
      lightbox.setAttribute('title', 'Click anywhere to close');
      document.body.appendChild(lightbox);
    }
    return lightbox;
  }

  function getLightboxImage() {
    const lightbox = getLightbox();
    let imageElement = lightbox.querySelector(lightboxImageClass);
    if (!imageElement) {
      imageElement = document.createElement('div');
      imageElement.classList.add(lightboxImageClass)
      lightbox.appendChild(imageElement);
    }
    return imageElement;
  }

  function closeLightbox() {
    const lightbox = getLightbox();
    document.body.classList.remove(withLightboxClass);
    document.body.removeChild(lightbox);
  }

})();
