const $leftButton = $('.left');
const $rightButton = $('.right');
const $interactButton = $('.interact');
const $centerButton = $('.center');
const $eggEl = $('.egg')
const $trainingEl = $('.training')
const $rookieEl = $('.rookie')
const $championEl = $('.champion')
const $roomsEl = $('.rooms')
const rookieAge = findRandomIntFromInt(5, 10)
const championAge = findRandomIntFromInt(17, 25)
const letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
let name = 'DIGIMON';
let shift = 0;
let q = 0;
let time = 0;
let room = 1;
const $audioEl = $('.audio');

$audioEl.prop('volume', .15);

function updateLetter() {$('.alphabet').text(`${letter[q]}`)};
$('#name').text(name)

updateLetter()

console.log(rookieAge);
console.log(championAge);

$('.start').css('width', `${$('.window').css('width')}`).css('height', `${$('.window').css('height')}`)
$interactButton.text('Start');



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
    const timer = setInterval(function() {
        time ++;

        if ($('.bedroom').css('opacity') == .5) $('.bedroom').css('opacity', 1).css('transition', 'opacity 1s linear');
        
        $('.hunger').attr('max', digimon.maxHunger)
        $('.boredom').attr('max', digimon.maxBoredom)
        $('.sleep').attr('max', digimon.maxSleep)
        
        if (time % 5 === 0) {
            let chance = findRandomIntFromInt(1, 7)
            if (digimon.boredom < digimon.maxBoredom) if (chance === 1 || chance === 5 || chance === 6 || chance === 7) digimon.boredom++;
            if (digimon.hunger < digimon.maxHunger) if (chance === 2 || chance === 4 || chance === 5 || chance === 7) digimon.hunger++;
            if (digimon.sleep < digimon.maxSleep) if (chance === 3 || chance === 4 || chance === 6 || chance === 7) digimon.sleep++;
        }

        $('.hunger').val(digimon.hunger)
        $('.boredom').val(digimon.boredom)
        $('.sleep').val(digimon.sleep)
        
        digimon.age = Math.floor(time / 20);
        $('#age').text(digimon.age)
        
        if (time / 20 === rookieAge) {
            $trainingEl.css('opacity', 0).css('transition', 'opacity 1s linear')
            $rookieEl.css('opacity', 1);
            $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut()
            digimon.evolve()
        }
        
        if (time / 20 === championAge) {
            $rookieEl.css('opacity', 0).css('transition', 'opacity 1s linear')
            $championEl.css('opacity', 1);
            $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut()
            digimon.evolve()
        }
        
        if (digimon.hunger >= digimon.maxHunger || digimon.sleep >= digimon.maxSleep || digimon.boredom >= digimon.maxBoredom) {
            $audioEl.attr('src', './assets/digimon world 3 - game over copy.m4a')
            clearInterval(timer)
            $interactButton.text('Retry');
            if($eggEl.attr('src') == './assets/egg1.png') {
                if ($trainingEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_tokomon.png');
                if ($rookieEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_patamon.png');
                if ($championEl.css('opacity') == 1) $('.dead').attr('src', './assets/angemon.png');
            }
            else if($eggEl.attr('src') == './assets/egg.png') {
                if ($trainingEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_koromon.png');
                if ($rookieEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_agumon.png');
                if ($championEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_greymon.png');
            }
            else if($eggEl.attr('src') == './assets/egg2.png') {
                if ($trainingEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_tsunomon.png');
                if ($rookieEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_gabumon.png');
                if ($championEl.css('opacity') == 1) $('.dead').attr('src', './assets/dead_garurumon.png');
            }
            $('.dead').css('opacity', 1)
            $trainingEl.css('visibility', 'hidden')
            $rookieEl.css('visibility', 'hidden')
            $championEl.css('visibility', 'hidden')
            $('.game-over').css('visibility', 'visible')
            $roomsEl.fadeOut().fadeIn().fadeOut()
        }
    }, 1000);
};


$interactButton.on('click', function() {
    if ($eggEl.css('opacity') == 1) {
        $('.alphabet').css('visibility', 'visible')
        $('.input').css('visibility', 'visible')
        $interactButton.text('Submit'),
        $eggEl.css('opacity', 0).css('transition', 'opacity 1s linear');
        $('.select').css('visibility', 'visible');
    } 
    else if ($('.start').css('display') == 'block' && $('.alphabet').css('visibility') == 'visible') {
        startTimer();
        $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut();
        $roomsEl.css('display', 'block')
        $trainingEl.css('opacity', 1)
        if(room === 1) $interactButton.text('Play');
        $('.alphabet').css('visibility', 'hidden')
        $('.select').css('visibility', 'hidden');
        $trainingEl.css('animation', 'mymove linear 8s infinite')
        $rookieEl.css('animation', 'mymove linear 8s infinite')
        $championEl.css('animation', 'mymove linear 8s infinite')
        $audioEl.attr('src', './assets/digimon world 3 - save screen_magami online center menu copy.m4a')
    } 
    
    if ($('.start').css('display') == 'none' && $roomsEl.css('display') != 'none') {
        if (room === 0 && digimon.sleep > 0) {
            digimon.sleep--;
            $('.bedroom').css('opacity', '50%').css('transition', 'opacity 1s linear')
        }
        if (room === 1 && digimon.boredom > 0) digimon.boredom--;
        if (room === 2 && digimon.hunger > 0) digimon.hunger--;
    }
    
    if ($roomsEl.css('display') == 'none') location.reload();
})



$leftButton.on('click', function() {
    if ($eggEl.css('opacity') == 1) {
        $eggEl.attr('src', './assets/egg1.png')
        $trainingEl.attr('src', './assets/tokomon.png');
        $rookieEl.attr('src', './assets/patamon.png');
        $championEl.attr('src', './assets/angemon.png');
    }
    if ($('.alphabet').css('visibility') == 'visible') {
        if (q === 0) q = letter.length
        q--;
        $('.alphabet').text(`${letter[q]}`)
    }
    if ($('.start').css('display') == 'none' && $roomsEl.css('display') != 'none') {
        room = 0;
        $roomsEl.css('transform', `translate(100%, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Sleep');
    }
})

$centerButton.on('click', function() {
    if ($eggEl.css('opacity') == 1) {
        $eggEl.attr('src', './assets/egg.png')
        $trainingEl.attr('src', './assets/koromon.png');
        $rookieEl.attr('src', './assets/agumon.png');
        $championEl.attr('src', './assets/greymon.png');
    }
    if ($('.alphabet').css('visibility') == 'visible') {
        if (name == 'DIGIMON') name ='';
        name += letter[q]
        if (name.length > 7) name ='DIGIMON';
        console.log(name);
        $('#name').text(name)
    }
    if ($('.start').css('display') == 'none' && $roomsEl.css('display') != 'none') {
        room = 1;
        $roomsEl.css('transform', `translate(0, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Play');
    }
})

$rightButton.on('click', function() {
    if ($eggEl.css('opacity') == 1) {
        $eggEl.attr('src', './assets/egg2.png')
        $trainingEl.attr('src', './assets/tsunomon.png');
        $rookieEl.attr('src', './assets/gabumon.png');
        $championEl.attr('src', './assets/garurumon.png');
    }
    if ($('.alphabet').css('visibility') == 'visible') {
        if (q === letter.length - 1) q = -1
        q++;
        $('.alphabet').text(`${letter[q]}`)
    }
    if ($('.start').css('display') == 'none' && $roomsEl.css('display') != 'none') {
        room = 2;
        $roomsEl.css('transform', `translate(-100%, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Eat');
    }
});