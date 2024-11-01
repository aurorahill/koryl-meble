const sliderBox = document.querySelector('.intro__slider-box');

const slideText = [
  {
    title: `Doskonały design i praktyczne rozwiązania`,
    content: `Tworzymy meble dopasowane do twoich potrzeb. Stawiamy na ponadczasowy design i inteligentne rozwiązania. Wiemy, że ergonomiczne sprzęty gwarantują swobodę użytkowania.`,
    imageClass: 'image-first',
  },
  {
    title: `Wysoka jakość wykonania`,
    content: `Używamy materiałów i sprzętu najwyższej jakości. Meble, które tworzymy służą długie lata zachowując piękny wygląd mimo upływu czasu. Nasi fachowcy zajmą się projektem, pomiarami oraz wykonaniem.`,
    imageClass: 'image-second',
  },
  {
    title: `Indywidualne podejście do klienta`,
    content: `Oferujemy pełne wsparcie na każdym etapie projektowania mebli i urządzania wnętrz. Doświadczenie i kompleksowość pozwalają nam spełniać wszelkie marzenia naszych klientów - niezależnie od wielkości realizowanego projektu.`,
    imageClass: 'image-third',
  },
];

const createSlideCart = () => {
  slideText.forEach((slide) => {
    const slideCard = document.createElement('div');
    slideCard.classList.add('intro__slide', 'position-relative');
    slideCard.innerHTML = `
                <div class="intro__text-wrapper">
                  <div class="intro__text d-flex flex-column justify-content-between">
                    <h1 class='intro__title'>${slide.title}</h1>
                    <div class="d-flex flex-row justify-content-between">
                      <button
                        type="button"
                        class="btn-arrow-left intro__button"
                        tabindex="0"
                        aria-label="Następny slide"
                      ></button>
                    </div>
                    <h3 class='intro__content'>
                      ${slide.content}
                    </h3>
                    <div class="intro__contact-buttons  contact-buttons d-flex">
                      <a
                        href="https://www.instagram.com/koryl.meble/?igsh=MW95NHJ6d2ZqMHZ0Zg%3D%3D&fbclid=IwY2xjawEmvVpleHRuA2FlbQIxMAABHdPWo0AKE5MwD-a8fNhPTy74qs5LhTpIytozYHQFyPkjFaHbWdp4Vn7h1g_aem_JUk0zGTMWzqxtr5nQImOoA"
                        ><i class="bi bi-instagram"></i
                      ></a>
                      <a
                        href="https://www.facebook.com/profile.php?id=61552279268291"
                        ><i class="bi bi-facebook"></i
                      ></a>
                      <a href="#contact">Kontakt <i class="bi bi-arrow-right"></i></i
                      ></a>
                    </div>
                  </div>
                  <div class="intro__image position-relative">
                    <div class="bg-image ${slide.imageClass}"></div>
                  </div>
                </div>
                  `;
    sliderBox.appendChild(slideCard);
  });
};

createSlideCart();

const btns = document.querySelectorAll('.intro__button');
const sliderSpeed = 10000;

let touchStartX;
let touchStartY;
let touchEndX;
let touchEndY;

const handleSlider = () => {
  changeSlide(1);
};

let startSlider = setInterval(handleSlider, sliderSpeed);

const changeSlide = (direction) => {
  if (direction === -1) {
    sliderBox.insertBefore(
      sliderBox.lastElementChild,
      sliderBox.firstElementChild
    );
    sliderBox.style.transition = 'none';
    sliderBox.style.transform = `translateX(-${window.innerWidth}px)`;
  }

  setTimeout(() => {
    sliderBox.style.transition = 'transform 0.8s ease';
    if (direction === 1) {
      sliderBox.style.transform = `translateX(-${window.innerWidth}px)`;
    } else {
      sliderBox.style.transform = `translateX(0)`;
    }
  }, 20);

  setTimeout(() => {
    sliderBox.style.transition = 'none';

    if (direction === 1) {
      sliderBox.appendChild(sliderBox.firstElementChild); // Przenieś pierwszy slajd na koniec po przesunięciu w lewo
    }

    sliderBox.style.transform = '';
  }, 800);
};

const handleRightArrow = () => {
  changeSlide(1);
  resetInterval();
};

const resetInterval = () => {
  clearInterval(startSlider);
  startSlider = setInterval(handleSlider, sliderSpeed);
};

window.addEventListener('resize', () => changeSlide(1));
btns.forEach((btn) => btn.addEventListener('click', handleRightArrow));

sliderBox.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

sliderBox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Sprawdz, czy przesunięcie w poziomie jest większe niż w pionie
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) {
      changeSlide(1);
    } else {
      changeSlide(-1);
    }
    resetInterval();
  }
});
