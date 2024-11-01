//Obsługa modalu
const modalImages = document.querySelectorAll('.slider__img-list img');
const modalWrap = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__wrap .modal__img');
const btnModalPrev = document.querySelector('.modal__btn-prev');
const btnModalNext = document.querySelector('.modal__btn-next');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

const openModal = (index) => {
  currentIndex = index;
  modalImage.setAttribute('src', `images/fot${index + 1}_852_1136.jpg`);
  modalWrap.classList.add('active');
};

const closeModal = () => {
  modalWrap.classList.remove('active');
};

const showNextImage = () => {
  currentIndex = (currentIndex + 1) % modalImages.length;
  openModal(currentIndex);
};

const showPrevImage = () => {
  currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
  openModal(currentIndex);
};

const handleSwipe = () => {
  if (touchEndX < touchStartX - 50) {
    showNextImage();
  }
  if (touchEndX > touchStartX + 50) {
    showPrevImage();
  }
};

modalImages.forEach((image, index) => {
  image.addEventListener('click', () => openModal(index));
});

modalWrap.addEventListener('click', closeModal);

btnModalNext.addEventListener('click', (e) => {
  e.stopPropagation();
  showNextImage();
});

btnModalPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrevImage();
});

modalWrap.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modalWrap.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

//Obsługa slidera
const initSlider = () => {
  const imageList = document.querySelector(
    `.slider__wrapper .slider__img-list`
  );
  const slideButtons = document.querySelectorAll('.slider__buttons');
  const sliderScrollbar = document.querySelector(`.slider__scrollbar`);
  const scrollbarThumb = sliderScrollbar.querySelector(
    '.slider__scrollbar-thumb'
  );
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  const updateScrollbarPosition = (deltaX, startThumbPosition) => {
    const newThumbPosition = startThumbPosition + deltaX;
    const maxThumbPosition =
      sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth - 60;
    const boundedPosition = Math.max(
      0,
      Math.min(maxThumbPosition, newThumbPosition)
    );
    const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

    scrollbarThumb.style.left = `${boundedPosition}px`;
    imageList.scrollLeft = scrollPosition;
  };

  const handleScrollbarDrag = (startX, startThumbPosition) => {
    const onMouseMove = (e) =>
      updateScrollbarPosition(e.clientX - startX, startThumbPosition);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleScrollbarTouch = (startX, startThumbPosition) => {
    const onTouchMove = (e) =>
      updateScrollbarPosition(
        e.touches[0].clientX - startX,
        startThumbPosition
      );
    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth - 60);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? 'none' : 'block';
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
  };

  scrollbarThumb.addEventListener('mousedown', (e) =>
    handleScrollbarDrag(e.clientX, scrollbarThumb.offsetLeft)
  );
  scrollbarThumb.addEventListener('touchstart', (e) =>
    handleScrollbarTouch(e.touches[0].clientX, scrollbarThumb.offsetLeft)
  );

  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.id.includes('prev') ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction * 0.7;
      imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  imageList.addEventListener('scroll', () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });

  // Initial update for buttons and scrollbar thumb
  handleSlideButtons();
  updateScrollThumbPosition();
};

window.addEventListener('load', () => {
  initSlider();
});

window.addEventListener('resize', () => {
  initSlider();
});
