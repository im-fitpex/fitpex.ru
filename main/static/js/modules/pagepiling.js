// PagePiling функциональность
import { recordCellPositions, initPageAnimations } from './skills.js';
import { initAnimations } from './animations.js';

export function initPagePiling() {
    $('#pagepiling').pagepiling({
        anchors: ['page1', 'page2', 'page3', 'page4'],
        sectionsColor: ['#121212', '#121212', '#121212', '#121212'],
        afterRender: function() {
            // ensure spawn positions are recorded after pagepiling layout
            recordCellPositions();
            initAnimations();
            // Trigger page animations for the initially visible section
            const active = document.querySelector('.pp-section.active') || document.querySelector('#pagepiling .section');
            if (active) {
                const sections = Array.from(document.querySelectorAll('.pp-section, #pagepiling .section'));
                const index = sections.indexOf(active) + 1; // initPageAnimations expects 1-based index
                if (index > 0) initPageAnimations(null, index);
            }
        },
        afterLoad: initPageAnimations,
        onLeave: function(index, nextIndex, direction) {
            // do NOT re-stack skills cards when leaving the section
        }
    });

    // Scroll buttons
    $('#up, #down').on('click', function() {
        $.fn.pagepiling[$(this).is('#up') ? 'moveSectionUp' : 'moveSectionDown']();
    });
}