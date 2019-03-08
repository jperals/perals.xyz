(function lightbox() {

  const imageSelector = '.enlarge';
  const lightboxId = 'lightbox'

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
      const lightbox = getLightbox()
      lightbox.style.backgroundImage = `url(${imageElement.src})`;
      lightbox.addEventListener('click', closeLightbox);
      document.body.appendChild(lightbox);
      document.body.classList.add('with-lightbox');
    }
  }

  function getLightbox() {
    let lightbox = document.querySelector('#' + lightboxId)
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = lightboxId;
      lightbox.setAttribute('title', 'Click anywhere to close');
    }
    return lightbox;
  }

  function closeLightbox() {
    const lightbox = getLightbox();
    document.body.classList.remove('with-lightbox');
    document.body.removeChild(lightbox);
  }

})();
