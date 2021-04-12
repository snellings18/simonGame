buttonColors = ['red', 'blue', 'green', 'yellow'];
gamePattern = [];
userClickedpattern = [];

let gameStart = false;
let level = 0;


$(document).keydown(function() {
    if (!gameStart) {
        $('h1').text(`Level ${level}`);
        nextSequence();
        gameStart = true;
    }
});


$('.btn').on('click', function() {
    let userChosenColor = $(this).attr('id');
    userClickedpattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedpattern.length-1);
});


checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel] === userClickedpattern[currentLevel]) {
        if(userClickedpattern.length === gamePattern.length)  {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }

    } else {
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text('Game Over! Press Any Key to Restart');
        startOver();
    } 
}


function nextSequence() {
    userClickedpattern = [];
    level ++;
    $('h1').text(`Level ${level}`);

    let randNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}


startOver = () => {
    level = 0;
    gamePattern = [];
    gameStart = false;
}