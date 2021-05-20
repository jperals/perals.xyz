const elements = document.querySelectorAll('[data-changingtext]');
for (const el of elements) {
  const alternativeTexts = el.getAttribute('data-changingtext').split(',');
  let index = 0;
  setInterval(function() {
    el.classList.add('changing-text');
    const newText = alternativeTexts[index];
    setTimeout(function() {
      el.innerHTML = newText.split('').map(char => `<span>${char}</span>`).join('');
      setTimeout(() => {
        el.classList.remove('changing-text');
      }, 100);
    }, 1000);
    index ++;
    index = index % alternativeTexts.length;
  },
  3000);
}