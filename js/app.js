const $leftButton = $('.left');
const $rightButton = $('.right');
const $interactButton = $('.interact');
const $centerButton = $('.center');
const evolution = [$(".training"), $('.rookie'), $('.champion')];
const rookieAge = findRandomIntFromInt(5, 10)
const championAge = findRandomIntFromInt(17, 25)
const letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
let name = 'DIGIMON';
let shift = 0;
let q = 0;
let time = 0;
let room = 1;

function updateLetter() {$('.alphabet').text(`${letter[q]}`)};
$('#name').text(name)
console.log(name.length);

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
        time += 5;
        if ($('.bedroom').css('opacity') == .5) $('.bedroom').css('opacity', 1).css('transition', 'opacity 1s linear');
        $('.hunger').attr('max', digimon.maxHunger)
        $('.boredom').attr('max', digimon.maxBoredom)
        $('.sleep').attr('max', digimon.maxSleep)
        console.log(time);
        if (time % 5 === 0) {
            let chance = findRandomIntFromInt(1, 7)
            // if (digimon.boredom < digimon.maxBoredom) if (chance === 1 || chance === 5 || chance === 6 || chance === 7) digimon.boredom++;
            // if (digimon.hunger < digimon.maxHunger) if (chance === 2 || chance === 4 || chance === 5 || chance === 7) digimon.hunger++;
            // if (digimon.sleep < digimon.maxSleep) if (chance === 3 || chance === 4 || chance === 6 || chance === 7) digimon.sleep++;
            console.log(digimon.hunger)
            console.log(digimon.boredom)
            console.log(digimon.sleep)
        }
        $('.hunger').val(digimon.hunger)
        $('.boredom').val(digimon.boredom)
        $('.sleep').val(digimon.sleep)
        digimon.age = Math.floor(time / 20);
        $('#age').text(digimon.age)
        if (time / 20 === rookieAge) {
            $('.training').css('opacity', 0).css('transition', 'opacity 1s linear')
            $('.rookie').css('opacity', 1);
            $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut()
            digimon.evolve()
        }
        if (time / 20 === championAge) {
            $('.rookie').css('opacity', 0).css('transition', 'opacity 1s linear')
            $('.champion').css('opacity', 1);
            $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut()
            digimon.evolve()
        }
        if (digimon.hunger >= digimon.maxHunger || digimon.sleep >= digimon.maxSleep || digimon.boredom >= digimon.maxBoredom) {
            clearInterval(timer)
            $('.game-over').css('visibility', 'visible')
            $('.rooms').fadeOut().fadeIn().fadeOut()
        }
    }, 1000);
};


$interactButton.on('click', function() {
    if ($('.egg').css('opacity') == 1) {
        $('.alphabet').css('visibility', 'visible')
        $('.input').css('visibility', 'visible')
        $interactButton.text('Submit'),
        $('.egg').css('opacity', 0).css('transition', 'opacity 1s linear');
        $('.select').css('visibility', 'visible');
    } else if ($('.start').css('display') == 'block' && $('.alphabet').css('visibility') == 'visible') {
        startTimer();
        $('.start').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut();
        $('.rooms').css('display', 'block')
        $('.training').css('opacity', 1)
        if(room === 1) $interactButton.text('Play');
        $('.alphabet').css('visibility', 'hidden')
        $('.select').css('visibility', 'hidden');
    } 

    if ($('.start').css('display') == 'none') {
        if (room === 0 && digimon.sleep > 0) {
            digimon.sleep--;
            $('.bedroom').css('opacity', '50%').css('transition', 'opacity 1s linear')
        }
        if (room === 1 && digimon.boredom > 0) digimon.boredom--;
        if (room === 2 && digimon.hunger > 0) digimon.hunger--;
    }
})



$leftButton.on('click', function() {
    if ($('.alphabet').css('visibility') == 'visible') {
        if (q === 0) q = letter.length
        q--;
        $('.alphabet').text(`${letter[q]}`)
    }
    if ($('.start').css('display') == 'none') {
        room = 0;
        $('.rooms').css('transform', `translate(100%, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Sleep');
    }
})

$centerButton.on('click', function() {
    if ($('.alphabet').css('visibility') == 'visible') {
        if (name == 'DIGIMON') name ='';
        if (name.length > 7) name ='';
        name += letter[q]
        console.log(name);
        $('#name').text(name)
    }
    if ($('.start').css('display') == 'none') {
        room = 1;
        $('.rooms').css('transform', `translate(0, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Play');
    }
})

$rightButton.on('click', function() {
    if ($('.alphabet').css('visibility') == 'visible') {
        if (q === letter.length - 1) q = -1
        q++;
        $('.alphabet').text(`${letter[q]}`)
    }
    if ($('.start').css('display') == 'none') {
        room = 2;
        $('.rooms').css('transform', `translate(-100%, 0)`).css('transition', 'transform 3s linear')
        $interactButton.text('Eat');
    }
});