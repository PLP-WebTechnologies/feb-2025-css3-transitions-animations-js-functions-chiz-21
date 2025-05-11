document.addEventListener('DOMContentLoaded', function () {
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  });

  // Initialize liked products from localStorage
  const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];

  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button, index) => {
    if (likedProducts.includes(index)) {
      button.classList.add('liked');
      button.textContent = '❤️ Liked';
    }

    // Add click event to like buttons
    button.addEventListener('click', function () {
      const buttonIndex = Array.from(likeButtons).indexOf(this);

      if (this.classList.contains('liked')) {
        // Unlike
        this.classList.remove('liked');
        this.textContent = '🤍 Like';

        const i = likedProducts.indexOf(buttonIndex);
        if (i > -1) likedProducts.splice(i, 1);
      } else {
        // Like
        this.classList.add('liked');
        this.textContent = '❤️ Liked';

        // Animation
        this.style.animation = 'none';
        setTimeout(() => {
          this.style.animation = 'pulse 0.4s';
        }, 10);

        if (!likedProducts.includes(buttonIndex)) likedProducts.push(buttonIndex);
      }

      localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    });
  });

  // Animate image on CTA click
  const animateBtn = document.getElementById('animateBtn');
  const animatedImage = document.getElementById('animatedImage');

  animateBtn.addEventListener('click', () => {
    animatedImage.classList.remove('grow'); // Reset
    void animatedImage.offsetWidth; // Force reflow
    animatedImage.classList.add('grow');
  });
});
