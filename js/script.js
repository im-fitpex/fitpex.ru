$(document).ready(function () {
    $('#pagepiling').pagepiling({
        anchors: ['page1', 'page2', 'page3', 'page4'],
        sectionsColor: ['#121212', '#121212', '#121212', '#121212'],
        onLeave: function (index, nextIndex, direction) {
        },
        afterRender: function () {
            // intro
            $('#s1').find('.mainText').css({ "display": "none" });
            $('#s1').find('.secondaryText').css({ "display": "none" });

            // hud
            $('#up').css({ 'color': 'white', 'right': '-5%' });
            $('#down').css({ 'color': 'white', 'right': '-5%' });
            $('#menu').css({ 'right': '-5%' });

            $('#up').delay(2000).animate({ right: '15px' }, 1500);
            $('#down').delay(2000).animate({ right: '15px' }, 1500);
            $('#menu').delay(2000).animate({ right: '15px' }, 1500);

            // moving the nickname
            $('#s1').find('.mainText').delay(100).animate({}, 0, function () {
                $(this).fadeIn(2000, function () {
                    $('#s1').find('p').first().delay(100).fadeIn(500, function () {});
                });
                $(this).animate({ 'font-size': '56pt' }, 2000);
            });
        },
        afterLoad: function (anchorLink, index) {}
    });

    // Scroll Up/Down Buttons
    $('#up').on('click', function () {
        $.fn.pagepiling.moveSectionUp();
    });

    $('#down').on('click', function () {
        $.fn.pagepiling.moveSectionDown();
    });
});

// Burger Menu Logic
document.getElementById("menuButton").onclick = function () {
    document.querySelector('.side-menu').classList.toggle('open');
};

document.querySelector(".close-btn").onclick = function () {
    document.querySelector('.side-menu').classList.remove('open');
};

// Optional: Close menu by clicking outside
document.addEventListener('click', function (event) {
    const menu = document.querySelector('.side-menu');
    const btn = document.getElementById('menuButton');
    if (!menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// Text Typing Animation
const textElement = document.querySelector('.text');
const textWidth = textElement.scrollWidth;
textElement.style.setProperty('--text-width', `${textWidth}px`);

// Cube Rotation Logic
const cube = document.querySelector('.cube');

let isAutoRotating = true;

// document.addEventListener('click', function () {
//     isAutoRotating = !isAutoRotating;
//     cube.style.animation = isAutoRotating ? 'rotate 10s infinite linear' : 'none';
// });

document.addEventListener('mousemove', function (e) {
    if (!isAutoRotating) {
        const xRotation = -(e.clientY / window.innerHeight - 0.5) * 20;
        const yRotation = (e.clientX / window.innerWidth - 0.5) * 20;
        cube.style.transform = `translateZ(50px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    }
});

setTimeout(() => {
    cube.style.animation = 'rotate 30s infinite linear';
}, 1000);

document.querySelector('.glitch-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Отменяем переход по ссылке
    document.querySelector('.dark-overlay').classList.add('active');
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const progressText = document.querySelector('.progress-text');
    const hexPath = document.querySelector('.hex-path');
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
        const phase = Object.keys(progressPhases)
            .reverse()
            .find(p => progress >= p);

        progressText.textContent = `${Math.floor(progress)}% | ${progressPhases[phase]}`;

        // Обновляем цвет через инлайновую переменную
        const neonColor = `hsl(${270 + progress * 1.2}deg, 80%, 65%)`;
        loader.style.setProperty('--neon-color', neonColor);

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

    setTimeout(() => {
        updateProgress();
    }, 800);
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const originalCards = document.querySelectorAll('.card:not([data-clone])');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicatorsContainer = document.querySelector('.indicators');
    
    // Создаем клоны карточек
    function createClones() {
        // Клонируем последние 2 карточки и добавляем в начало
for (let i = originalCards.length - 1; i >= originalCards.length - 2; i--) {
            const clone = originalCards[i].cloneNode(true);
            clone.setAttribute('data-clone', 'true');
            clone.classList.remove('active');
            carousel.insertBefore(clone, carousel.firstChild);
        }
        
        // Клонируем первые 2 карточки и добавляем в конец
        for (let i = 0; i < 2; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.setAttribute('data-clone', 'true');
            clone.classList.remove('active');
            carousel.appendChild(clone);
        }
    }
    
    createClones(); // Создаем клоны
    
    const cards = document.querySelectorAll('.card');
    let currentIndex = 2; // Начинаем с основной первой карточки
    const cardCount = originalCards.length; // Реальное количество уникальных карточек
    let isAnimating = false;
    
    // Создаем индикаторы
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < cardCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === getRealIndex(currentIndex)) indicator.classList.add('active');
            indicator.dataset.index = i;
            indicator.addEventListener('click', () => {
                if (!isAnimating) goToCard(i);
            });
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Получаем реальный индекс (без учета клонов)
    function getRealIndex(index) {
    const realIndex = index - 2;
    if (realIndex < 0) return cardCount + realIndex;
    if (realIndex >= cardCount) return realIndex - cardCount;
    return realIndex;
}
    
    // Находим основной элемент по индексу
    function findMainCardByIndex(index) {
        return document.querySelector(`.card[data-index="${index}"]:not([data-clone])`);
    }
    
    // Активируем карточку и ее клон (если есть)
    function activateCard(index, isClone) {
        // Сначала деактивируем все карточки
        cards.forEach(card => {
            card.classList.remove('active', 'clone-active');
        });
        
        // Активируем текущую карточку
        const activeCard = cards[index];
        activeCard.classList.add(isClone ? 'clone-active' : 'active');
        
        // Если это клон, активируем и основной элемент
        if (isClone) {
            const realIndex = activeCard.dataset.index;
            const mainCard = findMainCardByIndex(realIndex);
            if (mainCard) mainCard.classList.add('active');
        }
    }
    
    // Переход к конкретной карточке
    function goToCard(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Вычисляем новый индекс с учетом клонов
        currentIndex = index + 2;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Обновление карусели
    function updateCarousel() {
    // Определяем, находимся ли мы на клоне
    const isClone = cards[currentIndex].hasAttribute('data-clone');

    // Активируем карточку (и основной элемент, если это клон)
    activateCard(currentIndex, isClone);

    // Обновляем индикаторы
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === getRealIndex(currentIndex));
    });

    // Рассчитываем смещение для центрирования активной карточки
    const cardWidth = cards[0].offsetWidth + 20; // ширина карточки + margin
    const offset = -currentIndex * cardWidth + (carousel.offsetWidth / 2 - cardWidth / 2);
    carousel.style.transform = `translateX(${offset}px)`;

    // Проверяем, не достигли ли мы края (клонов)
    if (currentIndex <= 1) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex += cardCount;
            updateCarousel();
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    } else if (currentIndex >= cards.length - 2) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex -= cardCount;
            updateCarousel();
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    }
}
    
    // Переход к предыдущей карточке
    prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex--;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });
    
    // Переход к следующей карточке
    nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex++;
        updateCarousel();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });
    
    // Инициализация
    createIndicators();
    updateCarousel();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', updateCarousel);
    
    // Добавляем обработчик для свайпов (для мобильных устройств)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > threshold) {
            prevBtn.click();
        }
    }
});