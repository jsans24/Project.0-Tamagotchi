const $leftButton = $('.left')
const $rightButton = $('.right')
const $interactButton = $('.interact')
const $centerButton = $('.center')

console.log(`${$('.window').css('width')}`);

$('.start').css('width', `${$('.window').css('width')}`).css('height', `${$('.window').css('height')}`)

$leftButton.on('click', function() {
    $('.rooms').css('transform', `translate(100%, 0)`).css('transition', 'transform 3s linear')
})

$rightButton.on('click', function() {
    $('.rooms').css('transform', `translate(-100%, 0)`).css('transition', 'transform 3s linear')
})

$centerButton.on('click', function() {
    $('.rooms').css('transform', `translate(0, 0)`).css('transition', 'transform 3s linear')
})

