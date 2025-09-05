// Карусель

export function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const originalCards = document.querySelectorAll('.card:not([data-clone])');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicatorsContainer = document.querySelector('.indicators');
    
    if (!originalCards.length) return;

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
        if (!indicatorsContainer) return;
        
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