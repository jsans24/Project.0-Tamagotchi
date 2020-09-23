const $leftButton = $('.left')
const $rightButton = $('.right')
const $interactButton = $('.interact')
const $centerButton = $('.center')
let room = 1

$('.start').css('width', `${$('.window').css('width')}`).css('height', `${$('.window').css('height')}`)

if ($('.start').css('display', 'initial')) {
    $interactButton.text('Start');
    $interactButton.on('click', function() {
        $('.start').css('display', 'none');
        $interactButton.text('Play');
    })
}




$leftButton.on('click', function() {
    room = 0;
    $('.rooms').css('transform', `translate(100%, 0)`).css('transition', 'transform 3s linear')
    $interactButton.text('Sleep');
})

$rightButton.on('click', function() {
    room = 1;
    $('.rooms').css('transform', `translate(-100%, 0)`).css('transition', 'transform 3s linear')
    $interactButton.text('Eat');
})

$centerButton.on('click', function() {
    room = 2;
    $('.rooms').css('transform', `translate(0, 0)`).css('transition', 'transform 3s linear')
    $interactButton.text('Play');
})

