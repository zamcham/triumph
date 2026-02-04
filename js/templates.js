import { volunteerCards } from "./data/carouselData.js";
import { iconCardsList } from "./data/missionIconCardsData.js";


/* Mission Icon Cards */
const iconCardTemplate = document.getElementById('icon-card-template');
const iconCardsContainer = document.getElementById('iconCardsContainer');

for (let i = 0; i < iconCardsList.length; i += 1) {
  const iconCard = iconCardTemplate.content.cloneNode(true);
  
  const card = iconCardsList[i];
  iconCard.querySelector('img').src = card.icon;
  iconCard.querySelector('img').alt = card.title;
  iconCard.querySelector('h3').textContent = card.title;
  iconCard.querySelector('p').textContent = card.description;
  iconCard.querySelector('a').textContent = card.linkText;
  iconCard.querySelector('a').href = card.linkUrl;
  
  iconCardsContainer.appendChild(iconCard);
}


/* Volunteer Carousel */
const volunteerCardTemplate = document.getElementById('volunteer-card-template');
const wrapper = document.getElementById("volunteerSwiperWrapper");

volunteerCards.forEach(card => {
  // Clone the template
  const slide = volunteerCardTemplate.content.cloneNode(true);
  
  // Fill in the details
  slide.querySelector('img').src = card.image;
  slide.querySelector('img').alt = card.alt;
  slide.querySelector('.volunteer-name').textContent = card.title; // Changed this line
  
  // Append to wrapper
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