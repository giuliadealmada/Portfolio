// CUSTOM CURSOR
const customCursor = document.querySelector('.custom-cursor');

function getBackgroundLuminance(element) {
  let current = element;

  while (current && current !== document.documentElement) {
    const bg = window.getComputedStyle(current).backgroundColor;

    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const values = bg.match(/\d+(\.\d+)?/g);

      if (values && values.length >= 3) {
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

if (customCursor && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', (event) => {
    customCursor.classList.add('is-visible');
    customCursor.style.left = event.clientX + 'px';
    customCursor.style.top = event.clientY + 'px';

    const elementUnderCursor = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    if (elementUnderCursor) {
      const luminance = getBackgroundLuminance(elementUnderCursor);
      customCursor.classList.toggle('is-light', luminance < 0.35);
    }
  });

  document.addEventListener('mouseleave', () => {
    customCursor.classList.remove('is-visible');
  });

  document
    .querySelectorAll('a, button, .project-row, .project-card, .nav-mark, input, textarea')
    .forEach((element) => {
      element.addEventListener('mouseenter', () => {
        customCursor.classList.add('is-hovering');
      });

      element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('is-hovering');
      });
    });
}


// PROJECT EXPAND / CLOSE
function toggleProject(id) {
  const selectedProject = document.getElementById(id);

  if (!selectedProject) return;

  const allProjects = document.querySelectorAll('.project-expanded');

  allProjects.forEach((project) => {
    if (project !== selectedProject) {
      project.classList.remove('is-open');
    }
  });

  selectedProject.classList.toggle('is-open');
}


// CLOSE BUTTONS
document.querySelectorAll('.close-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();

    const expandedProject = button.closest('.project-expanded');

    if (expandedProject) {
      expandedProject.classList.remove('is-open');
    }
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".archive-grid .project-card");
const archiveGrid = document.querySelector(".archive-grid");

if (archiveGrid) {
  [...archiveGrid.children]
    .sort(() => Math.random() - 0.5)
    .forEach(card => archiveGrid.appendChild(card));
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach(card => {
      const categories = card.dataset.category;

      if (filter === "all" || categories.includes(filter)) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  });
});

const heroCarouselImages = document.querySelectorAll(".hero-carousel-image");

let currentHeroImage = 0;

if (heroCarouselImages.length > 1) {
  setInterval(() => {
    heroCarouselImages[currentHeroImage].classList.remove("active");

    currentHeroImage = (currentHeroImage + 1) % heroCarouselImages.length;

    heroCarouselImages[currentHeroImage].classList.add("active");
  }, 3000);
}
