const carouselCopy = document
  .querySelector('.aboutus__images-wrap')
  .cloneNode(true);
document.querySelector('.aboutus__images-scroll').appendChild(carouselCopy);
