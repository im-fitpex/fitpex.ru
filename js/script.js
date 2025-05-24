document.addEventListener('DOMContentLoaded', function() {
    // PagePiling initialization
    $('#pagepiling').pagepiling({
        anchors: ['page1', 'page2', 'page3', 'page4'],
        sectionsColor: ['#121212', '#121212', '#121212', '#121212'],
        afterRender: initAnimations
    });

    // Scroll buttons
    $('#up, #down').on('click', function() {
        $.fn.pagepiling[$(this).is('#up') ? 'moveSectionUp' : 'moveSectionDown']();
    });

    // Menu toggle
    const menu = document.querySelector('.side-menu');
    document.getElementById("menuButton").addEventListener('click', () => menu.classList.toggle('open'));
    document.querySelector(".close-btn").addEventListener('click', () => menu.classList.remove('open'));
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !event.target.closest('#menuButton')) {
            menu.classList.remove('open');
        }
    });

    // Text typing animation
    const textElement = document.querySelector('.text');
    textElement.style.setProperty('--text-width', `${textElement.scrollWidth}px`);

    // Cube rotation
    const cube = document.querySelector('.cube');
    setTimeout(() => cube.style.animation = 'rotate 30s infinite linear', 1000);

    // Glitch button loader
    document.querySelector('.glitch-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        initLoader();
    });

    // Carousel initialization
    initCarousel();
});

function initAnimations() {
    // Intro animations
    const s1 = $('#s1');
    s1.find('.mainText, .secondaryText').hide();

    // HUD animations
    const hudElements = $('#up, #down, #menu');
    hudElements.css({ 'color': 'white', 'right': '-5%' });
    hudElements.delay(2000).animate({ right: '15px' }, 1500);

    // Nickname animation
    s1.find('.mainText').delay(100).animate({}, 0, function() {
        // Параллельная анимация появления и увеличения шрифта
        $(this).fadeIn(2000)
               .animate({ 'font-size': '56pt' }, 2000)
               .promise()
               .done(function() {
                   // После завершения всех анимаций Fitpex
                   s1.find('.secondaryText').fadeIn(500);
               });
    });
}

function initLoader() {
    const overlay = document.querySelector('.dark-overlay');
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const progressText = document.querySelector('.progress-text');
    const hexPath = document.querySelector('.hex-path');
    
    overlay.classList.add('active');
    let progress = 0;
    let isAnimating = true;

    const progressPhases = {
        0: 'BOOTING SYSTEM',
        25: 'LOADING MODULES',
        50: 'VERIFYING DATA',
        75: 'OPTIMIZING',
        90: 'FINALIZING',
        100: 'READY'
    };

    const updateProgress = () => {
        if (!isAnimating) return;
        progress = Math.min(progress + 0.8, 100);
        const phase = Object.keys(progressPhases).reverse().find(p => progress >= p);

        progressText.textContent = `${Math.floor(progress)}% | ${progressPhases[phase]}`;
        loader.style.setProperty('--neon-color', `hsl(${270 + progress * 1.2}deg, 80%, 65%)`);

        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            isAnimating = false;
            hexPath.style.strokeDashoffset = '0';
            hexPath.style.animation = 'none';
            document.querySelector('.dynamic-fill').style.animation = 'none';

            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                content.classList.add('visible');
            }, 800);
        }
    };

    setTimeout(updateProgress, 800);
}

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const originalCards = document.querySelectorAll('.card:not([data-clone])');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicatorsContainer = document.querySelector('.indicators');
    
    // Create clones
    function createClones() {
        for (let i = originalCards.length - 1; i >= originalCards.length - 2; i--) {
            const clone = originalCards[i].cloneNode(true);
            clone.setAttribute('data-clone', 'true');
            clone.classList.remove('active');
            carousel.insertBefore(clone, carousel.firstChild);
        }
        
        for (let i = 0; i < 2; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.setAttribute('data-clone', 'true');
            clone.classList.remove('active');
            carousel.appendChild(clone);
        }
    }
    
    createClones();
    const cards = document.querySelectorAll('.card');
    let currentIndex = 2;
    const cardCount = originalCards.length;
    let isAnimating = false;
    
    // Create indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < cardCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === getRealIndex(currentIndex)) indicator.classList.add('active');
            indicator.dataset.index = i;
            indicator.addEventListener('click', () => !isAnimating && goToCard(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function getRealIndex(index) {
        const realIndex = index - 2;
        if (realIndex < 0) return cardCount + realIndex;
        if (realIndex >= cardCount) return realIndex - cardCount;
        return realIndex;
    }
    
    function updateCarousel() {
        const isClone = cards[currentIndex].hasAttribute('data-clone');
        activateCard(currentIndex, isClone);
        updateIndicators();
        centerActiveCard();
        checkBoundaries();
    }
    
    function activateCard(index, isClone) {
        cards.forEach(card => card.classList.remove('active', 'clone-active'));
        const activeCard = cards[index];
        activeCard.classList.add(isClone ? 'clone-active' : 'active');
        
        if (isClone) {
            const mainCard = document.querySelector(`.card[data-index="${activeCard.dataset.index}"]:not([data-clone])`);
            if (mainCard) mainCard.classList.add('active');
        }
    }
    
    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === getRealIndex(currentIndex));
        });
    }
    
    function centerActiveCard() {
        const cardWidth = cards[0].offsetWidth + 20;
        const offset = -currentIndex * cardWidth + (carousel.offsetWidth / 2 - cardWidth / 2);
        carousel.style.transform = `translateX(${offset}px)`;
    }
    
    function checkBoundaries() {
        if (currentIndex <= 1) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex += cardCount;
                updateCarousel();
                setTimeout(() => carousel.style.transition = 'transform 0.5s ease', 10);
            }, 500);
        } else if (currentIndex >= cards.length - 2) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex -= cardCount;
                updateCarousel();
                setTimeout(() => carousel.style.transition = 'transform 0.5s ease', 10);
            }, 500);
        }
    }
    
    function goToCard(index) {
        isAnimating = true;
        currentIndex = index + 2;
        updateCarousel();
        setTimeout(() => isAnimating = false, 500);
    }
    
    // Event listeners
    prevBtn?.addEventListener('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            currentIndex--;
            updateCarousel();
            setTimeout(() => isAnimating = false, 500);
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            currentIndex++;
            updateCarousel();
            setTimeout(() => isAnimating = false, 500);
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX, {passive: true});
    carousel.addEventListener('touchend', (e) => {
        if (!isAnimating) {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextBtn?.click();
            else if (touchEndX - touchStartX > 50) prevBtn?.click();
        }
    }, {passive: true});
    
    // Initialize
    createIndicators();
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
}

// Form submission handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const statusMessage = document.getElementById('statusMessage');
            const submitBtn = this.querySelector('.submit-btn');
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                statusMessage.className = 'status-message status-success show';
                statusMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = '<span>Send Message</span>';
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    statusMessage.classList.remove('show');
                }, 5000);
            }, 2000);
        });

        // Add staggered animation to contact methods
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach((method, index) => {
            method.style.animationDelay = `${index * 0.2}s`;
            method.style.animation = 'slideInLeft 0.8s ease-out forwards';
        });

        // Add floating animation to form elements
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
            group.style.animation = 'slideInRight 0.8s ease-out forwards';
        });