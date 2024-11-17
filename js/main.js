document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('lifestyleVideo');
    
    function initVideo() {
        if (!video) return;

        // Reset the video source with the current time
        const currentTime = new Date().getTime();
        const videoSrc = `https://storage.googleapis.com/msgsndr/RWD1uKPwFu84Zcm7Go2Q/media/673935e6e3d9714f4266319c.mov?t=${currentTime}`;
        
        // Create new source elements
        const mp4Source = document.createElement('source');
        mp4Source.src = videoSrc;
        mp4Source.type = 'video/mp4';
        
        const movSource = document.createElement('source');
        movSource.src = videoSrc;
        movSource.type = 'video/quicktime';
        
        // Clear existing sources
        while (video.firstChild) {
            video.removeChild(video.firstChild);
        }
        
        // Add new sources
        video.appendChild(mp4Source);
        video.appendChild(movSource);
        
        // Load and play
        video.load();
        video.play().catch(function(error) {
            console.log("Video play failed, retrying...", error);
            setTimeout(initVideo, 1000);
        });
    }

    // Initialize video
    initVideo();
    
    // Add video event listeners
    if (video) {
        video.addEventListener('loadstart', () => console.log('Video load started'));
        video.addEventListener('loadeddata', () => console.log('Video data loaded'));
        video.addEventListener('playing', () => console.log('Video is playing'));
        video.addEventListener('error', (e) => {
            console.error('Video error:', video.error);
            setTimeout(initVideo, 1000);
        });
    }
    
    // Handle page visibility for video
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && video) {
            initVideo();
        }
    });
    
    // Periodically check video status
    setInterval(function() {
        if (video && video.paused && document.visibilityState === 'visible') {
            console.log('Video paused, attempting to restart...');
            initVideo();
        }
    }, 5000);

    // Header and scroll functionality
    let header = document.querySelector('header');
    let mainLogo = document.querySelector('.main-logo');
    let joinButton = document.querySelector('.join-now-button');
    let floatingButton = document.querySelector('.floating-join-button');
    let lastScrollTop = 0;
    let isHeaderVisible = true;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show floating button when scrolled down
        if (scrollTop > scrollThreshold) {
            if (floatingButton) floatingButton.classList.add('visible');
        } else {
            if (floatingButton) floatingButton.classList.remove('visible');
        }
        
        // Handle header visibility
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold && isHeaderVisible) {
            if (header) header.style.transform = 'translateY(-100%)';
            isHeaderVisible = false;
        } else if (scrollTop <= scrollThreshold) {
            if (header) header.style.transform = 'translateY(0)';
            isHeaderVisible = true;
        }
        
        // Handle header transparency
        if (scrollTop <= 50) {
            if (header) header.classList.add('header-transparent');
            if (mainLogo) mainLogo.style.opacity = '1';
            if (joinButton) joinButton.classList.remove('glow');
        } else {
            if (header) header.classList.remove('header-transparent');
            if (mainLogo) mainLogo.style.opacity = '0.8';
            if (joinButton) joinButton.classList.add('glow');
        }
        
        lastScrollTop = scrollTop;
    });

    // Feature card popup functionality
    const featureCards = document.querySelectorAll('.feature-card');
    const popup = document.querySelector('.feature-popup-overlay');
    const popupContent = document.querySelector('.feature-details');
    const closeButton = document.querySelector('.feature-popup-close');

    function showPopup(featureId) {
        const allDetails = document.querySelectorAll('.feature-detail');
        allDetails.forEach(detail => detail.style.display = 'none');

        const targetDetail = document.querySelector(`.feature-detail[data-feature="${featureId}"]`);
        if (targetDetail) {
            targetDetail.style.display = 'block';
        }

        if (popup) {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                popup.classList.add('active');
            }, 10);
        }
    }

    function closePopup() {
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    }

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const featureId = card.getAttribute('data-feature');
            showPopup(featureId);
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }

    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your interest! We will contact you soon.');
            contactForm.reset();
        });
    }
});
