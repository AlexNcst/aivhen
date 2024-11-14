document.addEventListener('DOMContentLoaded', () => {
    // Pop-up image animation
    const popUpImage = document.querySelector('.pop-up-image');
    if (popUpImage) {
        popUpImage.classList.add('loaded');
    }

    // Slide-in animation on scroll for both scroll down and up
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove the class to allow sliding when scrolling back up
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Adjusts when the observer triggers (e.g., 10% visibility)
    });

    const slideInSections = document.querySelectorAll('.slide-in');
    slideInSections.forEach(section => {
        observer.observe(section);
    });


    const imagesContainer = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;
    let currentIndex = 0;
    let slideshowInterval;

    // Function to update the displayed image
    function updateImage(index) {
        const offset = -index * 100; // Move by 100% of the container width
        imagesContainer.style.transform = `translateX(${offset}%)`;
    }

    // Function to start the automatic slideshow
    function startSlideshow() {
        stopSlideshow(); // Stop any existing interval
        slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages; // Loop to the beginning
            updateImage(currentIndex);
        }, 5000); // 5 seconds interval
    }

    // Function to stop the automatic slideshow
    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }

    // Arrow button functionality
    document.querySelector('.left-arrow').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        updateImage(currentIndex);
        startSlideshow(); // Restart slideshow after manual interaction
    });

    document.querySelector('.right-arrow').addEventListener('click', () => {
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateImage(currentIndex);
        startSlideshow(); // Restart slideshow after manual interaction
    });

    // Swipe functionality
    let startX;
    imagesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopSlideshow(); // Stop slideshow during swipe
    });

    imagesContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const threshold = 50; // Minimum swipe distance to trigger

        if (startX - endX > threshold) {
            // Swipe left
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        } else if (endX - startX > threshold) {
            // Swipe right
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        }
        updateImage(currentIndex);
        startSlideshow(); // Restart slideshow after swipe
    });

    // Start the slideshow on load
    startSlideshow();





});


