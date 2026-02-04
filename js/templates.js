import { volunteerCards } from "./data/carouselData.js";
import { iconCardsList } from "./data/missionIconCardsData.js";


/*  Volunteer Carousel */
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


/*  Mission Icon Cards */
const iconCardTemplate = document.getElementById('icon-card-template');
const iconCardsContainer = document.getElementById('iconCardsContainer');

// Loop through the iconCardsList and generate cards
for (let i = 0; i < iconCardsList.length; i += 1) {
  // Clone the template
  const iconCard = iconCardTemplate.content.cloneNode(true);
  
  // Fill in the details
  const card = iconCardsList[i];
  iconCard.querySelector('img').src = card.icon;
  iconCard.querySelector('img').alt = card.title;
  iconCard.querySelector('h3').textContent = card.title;
  iconCard.querySelector('p').textContent = card.description;
  iconCard.querySelector('a').textContent = card.linkText;
  iconCard.querySelector('a').href = card.linkUrl;
  
  // Append to container
  iconCardsContainer.appendChild(iconCard);
}