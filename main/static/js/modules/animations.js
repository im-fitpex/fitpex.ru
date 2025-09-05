// Основные анимации

export function initAnimations() {
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