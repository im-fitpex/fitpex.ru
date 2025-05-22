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

document.querySelector('.glitch-btn').addEventListener('click', function(e) {
  e.preventDefault(); // предотвращает переход по ссылке
  document.querySelector('.dark-overlay').classList.add('active');
});