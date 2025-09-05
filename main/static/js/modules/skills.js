// Анимации навыков
let skillsSpawnRecorded = false;

export function recordCellPositions() {
    const wrapper = document.querySelector('.skills-wrapper');
    if (!wrapper) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const cells = Array.from(wrapper.querySelectorAll('.cell'));
    if (!cells.length) return;

    // Disable effect on narrow screens to keep responsive layout
    if (window.innerWidth < 768) {
        cells.forEach(cell => {
            cell.dataset.stackedLeft = '';
            cell.dataset.stackedTop = '';
            cell.style.position = '';
            cell.style.left = '';
            cell.style.top = '';
            cell.style.transition = '';
            cell.classList.remove('stacked-initial');
            cell.style.zIndex = '';
        });
        skillsSpawnRecorded = false;
        return;
    }

    const spawnCenterLeft = wrapperRect.width / 2;
    const spawnCenterTop = wrapperRect.height / 2;

    cells.forEach((cell, idx) => {
        const r = cell.getBoundingClientRect();
        const relLeft = r.left - wrapperRect.left;
        const relTop = r.top - wrapperRect.top;

        // compute stacked offsets so cell appears at spawn center
        const stackedLeft = spawnCenterLeft - (cell.offsetWidth / 2) - relLeft;
        const stackedTop = spawnCenterTop - (cell.offsetHeight / 2) - relTop;

        cell.dataset.stackedLeft = stackedLeft;
        cell.dataset.stackedTop = stackedTop;

        // set relative positioning and initial stacked coords
        cell.style.position = 'relative';
        cell.style.left = `${stackedLeft}px`;
        cell.style.top = `${stackedTop}px`;

        // ensure transition for left/top exists
        cell.style.transition = 'left 0.8s cubic-bezier(0.16,1,0.3,1), top 0.8s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s';
        cell.style.willChange = 'left, top';

        // set z-order so first card stays on top initially
        cell.style.zIndex = (cells.length - idx) + 10;

        cell.classList.add('stacked-initial');
    });

    skillsSpawnRecorded = true;
}

export function initPageAnimations(anchorLink, index) {
    if (index === 2) {  // Skills Section -> animate from stacked spawn -> to original places
        const wrapper = document.querySelector('.skills-wrapper');
        if (!wrapper) return;
        const cells = Array.from(wrapper.querySelectorAll('.cell'));
        if (!cells.length) return;

        // If screen is narrow, skip stacked spawn -> keep normal flow for responsive layout
        if (window.innerWidth < 768) {
            cells.forEach(cell => {
                cell.style.left = '';
                cell.style.top = '';
                cell.style.position = '';
                cell.classList.remove('stacked-initial');
                cell.style.zIndex = '';
            });
            return;
        }

        // If spawn wasn't recorded (e.g. pagepiling hadn't finished measuring), record now
        if (!skillsSpawnRecorded) recordCellPositions();

        // animate each cell to its natural place (left/top -> 0) with small stagger
        const baseDelay = 160;
        const stagger = 90;
        cells.forEach((cell, i) => {
            // ensure proper z-order during animation
            cell.style.zIndex = (cells.length - i) + 10;
            // force reflow before starting animation
            void cell.offsetWidth;

            setTimeout(() => {
                cell.style.left = '0px';
                cell.style.top = '0px';

                // cleanup after animation completes
                setTimeout(() => {
                    cell.classList.remove('stacked-initial');
                    cell.style.zIndex = '';
                }, 900);
            }, baseDelay + i * stagger);
        });
    }
}

export function resetSkillsAnimations() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('animate');
        for(let i = 0; i < 6; i++) {
            cell.classList.remove(`pos-${i}`);
        }
    });
}