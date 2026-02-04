document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.volunteer-swiper', {
    slidesPerView: 1.4,
    spaceBetween: 16,
    grabCursor: true,
    freeMode: true,
    momentum: true,

    breakpoints: {
      576: { slidesPerView: 2.5 },
      768: { slidesPerView: 4 },
      992: { slidesPerView: 6 },
      1200: { slidesPerView: 7 }
    }
  });
});
