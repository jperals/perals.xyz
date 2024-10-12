const elements = document.querySelectorAll('[data-changingtext]');
for (const el of elements) {
  const alternativeTexts = el.getAttribute('data-changingtext').split(',');
  const alternativeElements = alternativeTexts.map(text => text.split('').map(char => `<span>${char}</span>`).join(''))
  let index = 1;
  el.innerHTML = alternativeElements[0];
  setInterval(function() {
    index = index % alternativeElements.length;
    el.classList.add('changing-text');
    const nextElement = alternativeElements[index];
    setTimeout(function() {
      el.innerHTML = nextElement;
      setTimeout(() => {
        el.classList.remove('changing-text');
      }, 100);
    }, 1000);
    index ++;
  },
  5000);
}
