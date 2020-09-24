const $leftButton = $('.left')
const $rightButton = $('.right')
const $interactButton = $('.interact')
const $centerButton = $('.center')
const evolution = [{0: $(".koromon"), 1: $('.agumon'), 2: $('.greymon')}]
let time = 0;
let room = 1

$('.start').css('width', `${$('.window').css('width')}`).css('height', `${$('.window').css('height')}`)
$interactButton.text('Start');


$interactButton.on('click', function() {
    if ($('.start').css('display') == 'block') {
        startTimer();
        $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut();
        $('.egg').css('opacity', 0).css('transition', 'opacity 1s linear');
        $('.koromon').css('opacity', 1)//.css('transition', 'opacity 1s linear');
        if(room === 1) $interactButton.text('Play');
        console.log(($('.start').css('display')));
    }
})



$leftButton.on('click', function() {
    if ($('.start').css('display', 'none')) {
        room = 0;
        $('.rooms').css('transform', `translate(100%, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Sleep');
    }
})

$centerButton.on('click', function() {
    if ($('.start').css('display', 'none')) {
        room = 1;
        $('.rooms').css('transform', `translate(0, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Play');
    }
})

$rightButton.on('click', function() {
    if ($('.start').css('display', 'none')) {
        room = 2;
        $('.rooms').css('transform', `translate(-100%, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Eat');
    }
});

function findRandomIntFromInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
class Tamagotchi{
    constructor() {
        this.maxHunger = 10;
        this.maxSleep = 10;
        this.maxBoredom = 10;
        this.boredom = 0;
        this.sleep = 0;
        this.hunger = 0;
        this.age = 0;
    };

    evolve() {
        this.maxHunger += findRandomIntFromInt(0, 3);
        this.maxSleep += findRandomIntFromInt(0, 3);
        this.maxBoredom += findRandomIntFromInt(0, 3);
    };
};

const digimon = new Tamagotchi();



function startTimer() {
    setInterval(function() {
        time++;
        $('.hunger').attr('max', digimon.maxHunger)
        $('.boredom').attr('max', digimon.maxBoredom)
        $('.sleep').attr('max', digimon.maxSleep)
        console.log(time);
        if (time % 5 === 0) {
            let chance = findRandomIntFromInt(1, 7)
            console.log(chance);
            if (chance === 1 || chance === 5 || chance === 6 || chance === 7) digimon.boredom++;
            if (chance === 2 || chance === 4 || chance === 5 || chance === 7) digimon.hunger++;
            if (chance === 3 || chance === 4 || chance === 6 || chance === 7) digimon.sleep++;
        }
        $('.hunger').val(digimon.hunger)
        $('.boredom').val(digimon.boredom)
        $('.sleep').val(digimon.sleep)
        if (time % 20 === 0) digimon.age++;
        // console.log(digimon.age);
    }, 1000);
};

