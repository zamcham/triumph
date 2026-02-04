import { volunteerCards } from "./carouselData.js";

const wrapper = document.getElementById("volunteerSwiperWrapper");

volunteerCards.forEach(card => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide volunteer-card";

  slide.innerHTML = `
    <img src="${card.image}" alt="${card.alt}">
    <p>${card.title}</p>
  `;

  wrapper.appendChild(slide);
});

// Init Swiper AFTER slides exist
new Swiper(".volunteer-swiper", {
  slidesPerView: 7,
  spaceBetween: 16,
  grabCursor: true,
  breakpoints: {
    0: { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 6 },
    1200: { slidesPerView: 7 }
  }
});
