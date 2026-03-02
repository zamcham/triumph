// Countdown Timer
function initCountdown() {
  const countdownElement = document.getElementById('countdown');
  
  // Set countdown duration to 1 hour (3600 seconds)
  let timeRemaining = 3600;

  function updateCountdown() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    // Format with leading zeros
    const formattedTime = 
      String(hours).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0');

    countdownElement.textContent = formattedTime;

    // Decrease time remaining
    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      clearInterval(countdownInterval);
      countdownElement.textContent = '00:00:00';
    }
  }

  // Update immediately
  updateCountdown();

  // Update every second
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', initCountdown);

// NAV 
const navCenter = document.querySelector('.navigation-bar-container');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 75) {
    navCenter.classList.add('scrolled');
  } else {
    navCenter.classList.remove('scrolled');
  }
});

const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  // Toggle hamburger to X
  const icon = menuBtn.querySelector('i');
  if (mobileMenu.classList.contains('active')) {
    icon.classList.remove('bi-list');
    icon.classList.add('bi-x');

    // Disable body scroll
    document.body.style.overflow = 'hidden';
  } else {
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');

    // Enable body scroll
    document.body.style.overflow = '';
  }
});

// Close menu when clicking a link
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');

    // Re-enable body scroll
    document.body.style.overflow = '';
  });
});

// Animation observer
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Resource Cards
const resourceCards = document.querySelectorAll('.additional-resources-section .option-card');
const resourceImage = document.querySelector('.additional-resources-section .resource-image');

const resourceImages = {
  'Community Nights': './assets/resources/communityNights.png',
  'Give Online': './assets/resources/giveOnline.png',
  'Connect With Us': './assets/resources/connectWithUs.png',
};

let currentIndex = 0;
let autoRotateInterval = null;
let progressInterval = null;
let elapsed = 0;

const ROTATION_TIME = 8000;
const PROGRESS_STEP = 100;
const CIRCUMFERENCE = 62.8;

function clearAllProgress() {
  resourceCards.forEach(card => {
    const circle = card.querySelector('.progress-circle');
    if (circle) {
      circle.style.transition = 'none';
      circle.style.strokeDashoffset = CIRCUMFERENCE;
    }
  });

  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function setActiveCard(index, resetElapsed = true) {
  clearAllProgress();

  resourceCards.forEach(card => card.classList.remove('active'));

  const activeCard = resourceCards[index];
  activeCard.classList.add('active');

  const cardTitle = activeCard.querySelector('h3').textContent.trim();
  if (resourceImages[cardTitle]) {
    resourceImage.src = resourceImages[cardTitle];
  }

  if (resetElapsed) elapsed = 0;
  startProgress(activeCard);
}

function nextCard() {
  currentIndex = (currentIndex + 1) % resourceCards.length;
  setActiveCard(currentIndex, true);
}

function startAutoRotate(remainingTime = ROTATION_TIME) {
  stopAutoRotate(false);
  autoRotateInterval = setTimeout(() => {
    nextCard();
    startAutoRotate();
  }, remainingTime);
}

function stopAutoRotate(pauseProgress = true) {
  if (autoRotateInterval) {
    clearTimeout(autoRotateInterval);
    autoRotateInterval = null;
  }

  if (pauseProgress && progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function startProgress(card) {
  const circle = card.querySelector('.progress-circle');

  circle.style.transition = 'none';
  circle.style.strokeDashoffset = CIRCUMFERENCE - (elapsed / ROTATION_TIME) * CIRCUMFERENCE;
  circle.getBoundingClientRect(); 
  circle.style.transition = '';

  progressInterval = setInterval(() => {
    elapsed += PROGRESS_STEP;
    const progress = elapsed / ROTATION_TIME;
    const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
    circle.style.strokeDashoffset = offset;

    if (elapsed >= ROTATION_TIME) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }, PROGRESS_STEP);
}

resourceCards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    stopAutoRotate(true);
    currentIndex = index;

    resourceCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const cardTitle = card.querySelector('h3').textContent.trim();
    if (resourceImages[cardTitle]) {
      resourceImage.src = resourceImages[cardTitle];
    }
  });

  card.addEventListener('mouseleave', () => {
    setActiveCard(currentIndex, false); 
    startAutoRotate(ROTATION_TIME - elapsed);
  });
});

// Initialize
setActiveCard(currentIndex, true);
startAutoRotate();