const $leftButton = $('.left')
const $rightButton = $('.right')
const $interactButton = $('.interact')

$leftButton.on('click', function() {
    $('.rooms').css('transform', 'translate(100%, 0)')
})