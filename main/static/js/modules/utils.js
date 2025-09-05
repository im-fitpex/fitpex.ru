// Вспомогательные функции

/**
 * Debounce функция для оптимизации частых вызовов
 * @param {Function} func - функция для выполнения
 * @param {number} wait - время задержки в мс
 * @param {boolean} immediate - выполнить сразу
 */
export function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttle функция для ограничения частоты вызовов
 * @param {Function} func - функция для выполнения
 * @param {number} limit - интервал в мс
 */
export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Проверка, является ли устройство мобильным
 * @returns {boolean}
 */
export function isMobile() {
    return window.innerWidth < 768;
}

/**
 * Проверка поддержки touch событий
 * @returns {boolean}
 */
export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Получение координат элемента относительно viewport
 * @param {HTMLElement} element
 * @returns {Object}
 */
export function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2
    };
}

/**
 * Плавная прокрутка к элементу
 * @param {HTMLElement} element
 * @param {Object} options
 */
export function smoothScrollTo(element, options = {}) {
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    element.scrollIntoView({ ...defaultOptions, ...options });
}

/**
 * Ожидание завершения анимации
 * @param {HTMLElement} element
 * @returns {Promise}
 */
export function waitForAnimation(element) {
    return new Promise(resolve => {
        const onAnimationEnd = () => {
            element.removeEventListener('animationend', onAnimationEnd);
            resolve();
        };
        element.addEventListener('animationend', onAnimationEnd);
    });
}

/**
 * Ожидание завершения перехода
 * @param {HTMLElement} element
 * @returns {Promise}
 */
export function waitForTransition(element) {
    return new Promise(resolve => {
        const onTransitionEnd = () => {
            element.removeEventListener('transitionend', onTransitionEnd);
            resolve();
        };
        element.addEventListener('transitionend', onTransitionEnd);
    });
}