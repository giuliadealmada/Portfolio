const customCursor = document.querySelector('.custom-cursor');

function getBackgroundLuminance(element){
  let current = element;

  while(current && current !== document.documentElement){
    const bg = window.getComputedStyle(current).backgroundColor;

    if(bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)'){
      const values = bg.match(/\d+(\.\d+)?/g);

      if(values && values.length >= 3){
        const r = Number(values[0]);
        const g = Number(values[1]);
        const b = Number(values[2]);

        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      }
    }

    current = current.parentElement;
  }

  return 1;
}

if(customCursor && window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove', (event) => {
    customCursor.classList.add('is-visible');
    customCursor.style.left = event.clientX + 'px';
    customCursor.style.top = event.clientY + 'px';

    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);

    if(elementUnderCursor){
      const luminance = getBackgroundLuminance(elementUnderCursor);
      customCursor.classList.toggle('is-light', luminance < 0.35);
    }
  });

  document.addEventListener('mouseleave', () => {
    customCursor.classList.remove('is-visible');
  });

  document.querySelectorAll('a, button, .project-card, .nav-mark, input, textarea').forEach((element) => {
    element.addEventListener('mouseenter', () => customCursor.classList.add('is-hovering'));
    element.addEventListener('mouseleave', () => customCursor.classList.remove('is-hovering'));
  });
}