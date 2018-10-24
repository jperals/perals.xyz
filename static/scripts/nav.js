(function initNav() {

  const activeClass = 'active';
  const navHiddenClass = 'hidden';
  const linksBySectionId = {};
  let nav;
  let secondSection;

  window.addEventListener('DOMContentLoaded', function () {
    retrieveElements();
    updateAll();
  });

  window.addEventListener('scroll', function () {
    if (document.body.classList.contains('with-gravity')) {
      return;
    }
    if (nav) {
      if (secondSection) {
        updateNavVisibility();
      }
      updateLinkStates();
    }
  });

  function updateNavVisibility() {
    const secondSectionTop = secondSection.getBoundingClientRect().top;
    if (secondSectionTop <= 0) {
      nav.classList.remove(navHiddenClass);
    } else {
      nav.classList.add(navHiddenClass);
    }
  }

  function retrieveElements() {
    nav = document.querySelector('nav');
    if (nav) {
      nav.querySelectorAll('a').forEach(link => {
        let id = link.getAttribute('href');
        if (id.startsWith('/')) {
          id = id.slice(1);
        }
        if (id.startsWith('#')) {
          id = id.slice(1);
        }
        if (id.length) {
          linksBySectionId[id] = link;
        }
      });
    }
    secondSection = document.querySelector('section:nth-child(2)');
  }

  function updateAll() {
    if (nav) {
      updateLinkStates();
      if (secondSection) {
        updateNavVisibility();
      }
    }
  }

  function updateLinkStates() {
    const sections = document.querySelectorAll('section');
    let currentSection;
    for (let i = 0; i < sections.length; i++) {
      const item = sections[i];
      const top = item.getBoundingClientRect().top;
      if (top > window.innerHeight / 2) {
        break;
      }
      if (item.getAttribute('id')) {
        currentSection = item;
      }
    }
    if (currentSection) {
      const sectionId = currentSection.getAttribute('id');
      for (const id in linksBySectionId) {
        const link = linksBySectionId[id];
        if (typeof link === 'object') {
          if (id === sectionId) {
            link.classList.add(activeClass);
          } else {
            link.classList.remove(activeClass);
          }
        }
      }
    }
  }
})();
