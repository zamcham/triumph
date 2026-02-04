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
      // When countdown reaches zero, you can reset or handle it differently
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