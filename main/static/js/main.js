// main.js - Основной файл инициализации
import { initPagePiling } from './modules/pagepiling.js';
import { initAnimations } from './modules/animations.js';
import { initMenu } from './modules/menu.js';
import { initCarousel } from './modules/carousel.js';
import { initLanguageSwitcher } from './modules/language.js';
import { initLoader } from './modules/loader.js';

document.addEventListener('DOMContentLoaded', function() {
    // PagePiling initialization
    initPagePiling();

    // Menu initialization
    initMenu();

    // Text typing animation
    const textElement = document.querySelector('.text');
    if (textElement) {
        textElement.style.setProperty('--text-width', `${textElement.scrollWidth}px`);
    }

    // Cube rotation
    const cube = document.querySelector('.cube');
    if (cube) {
        setTimeout(() => cube.style.animation = 'rotate 30s infinite linear', 1000);
    }

    // Glitch button loader
    const glitchBtn = document.querySelector('.glitch-btn');
    if (glitchBtn) {
        glitchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            initLoader();
        });
    }

    // Initialize other components
    initCarousel();
    
    // Initialize language switcher
    initLanguageSwitcher();
});