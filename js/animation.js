var animation = anime.timeline({
    delay: 400,
    endDelay: 400,
}).add({
    targets: '.splash-logo',
    easing: 'spring(1, 80, 10, 0)',
    delay: 400,
    width: '200px',
    height: '200px',
    duration: 100,
    opacity: 1,
    top: '50%'
}).add({
    targets: '.splash-logo',
    easing: 'easeInOutQuad',
    offset: '+=500',
    duration: 300,
    top: '5%',
    scale: 0.4
}).add({
    targets: '#splash-form-title',
    easing: 'easeInOutQuad',
    duration: 500,
    opacity: 1
}).add({
    targets: '.splash-form-column',
    easing: 'easeInOutQuad',
    duration: 500,
    delay: anime.stagger(200), // increase delay by 100ms for each elements.
    opacity: 1
}).add({
    targets: '#splash-button',
    easing: 'spring(1, 80, 10, 0)',
    duration: 300,
    opacity: 1
});