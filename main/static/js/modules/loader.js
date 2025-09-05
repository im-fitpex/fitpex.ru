// Загрузчик

export function initLoader() {
    const overlay = document.querySelector('.dark-overlay');
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const progressText = document.querySelector('.progress-text');
    const hexPath = document.querySelector('.hex-path');
    
    if (!overlay || !loader || !content || !progressText || !hexPath) return;
    
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
            const dynamicFill = document.querySelector('.dynamic-fill');
            if (dynamicFill) {
                dynamicFill.style.animation = 'none';
            }

            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                content.classList.add('visible');
            }, 800);
        }
    };

    setTimeout(updateProgress, 800);
}