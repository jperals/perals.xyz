const elements = document.querySelectorAll('[data-changingtext]');
for (const el of elements) {
  const alternativeTexts = el.getAttribute('data-changingtext').split(',');
  let index = 0;
  setInterval(function() {
    el.classList.add('changing-text');
    setTimeout(function() {
      el.innerHTML = alternativeTexts[index];
      el.classList.remove('changing-text');
    }, 500);
    index ++;
    index = index % alternativeTexts.length;
  },
  3000);
}