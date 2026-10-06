document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const splashScreen = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const wishForm = document.getElementById('wish-form');
    const wishesList = document.getElementById('wishes-list');

    let isPlaying = false;

    // 1. Enter Button & Audio Play
    enterBtn.addEventListener('click', () => {
        // Play Audio
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.remove('hidden');
        }).catch(err => {
            console.log("Audio play failed automatically:", err);
            isPlaying = false;
            musicToggle.classList.remove('hidden');
        });

        // Hide Splash Screen with animation
        splashScreen.classList.add('fade-out');
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 1000);
    });

    // 2. Music Toggle Floating Button
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.querySelector('i').className = 'fa-solid fa-compact-disc';
            isPlaying = false;
        } else {
            bgMusic.play();
            musicToggle.querySelector('i').className = 'fa-solid fa-compact-disc fa-spin';
            isPlaying = true;
        }
    });

    // 3. Countdown Timer Functionality
    // يمكنك تعديل التاريخ هنا (السنة، الشهر - 1، اليوم، الساعة)
    const weddingDate = new Date(2026, 10, 15, 20, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        } else {
            document.getElementById('countdown').innerHTML = "<h3 style='color: var(--dark-pink);'>تم بحمد الله عقد القران! 🎉</h3>";
        }
    }

    // Run Countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Guestbook Form (Wishes)
    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            // Create New Wish Card
            const newWishCard = document.createElement('div');
            newWishCard.className = 'wish-card';
            newWishCard.style.animation = 'fadeIn 0.5s ease';

            newWishCard.innerHTML = `
                <div class="wish-header">
                    <span class="author">${escapeHtml(name)}</span>
                    <span class="heart-icon"><i class="fa-solid fa-heart"></i></span>
                </div>
                <p class="wish-text">${escapeHtml(message)}</p>
            `;

            // Prepend wish to top of list
            wishesList.insertBefore(newWishCard, wishesList.firstChild);

            // Reset Form Inputs
            nameInput.value = '';
            messageInput.value = '';
        }
    });

    // Helper function to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }
});
