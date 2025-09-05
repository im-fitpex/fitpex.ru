// Меню и навигация

export function initMenu() {
    const menu = document.querySelector('.side-menu');
    const menuButton = document.getElementById("menuButton");
    const closeBtn = document.querySelector(".close-btn");

    if (!menu || !menuButton || !closeBtn) return;

    // Menu toggle
    menuButton.addEventListener('click', () => menu.classList.toggle('open'));
    closeBtn.addEventListener('click', () => menu.classList.remove('open'));
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !event.target.closest('#menuButton')) {
            menu.classList.remove('open');
        }
    });
}