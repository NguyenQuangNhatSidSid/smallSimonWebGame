'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickpattern = [];
let started = false;
let level = 0;

$(document).keypress(function (e) {
  if (!started) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function (e) {
  let uesrChosenColor = e.target.id;
  userClickpattern.push(uesrChosenColor);

  playSound(uesrChosenColor);
  animatePress(uesrChosenColor);

  checkAnswer(userClickpattern.length - 1);
});

const nextSequence = function () {
  userClickpattern = [];

  const randomNum = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNum];

  gamePattern.push(randomChosenColor);

  ++level;
  $('#level-title').text(`Level ${level}`);

  $(`#${randomChosenColor}`).fadeTo(100, 0.3, function () {
    $(this).fadeTo(500, 1.0);
  });
  playSound(randomChosenColor);
};

const checkAnswer = function (currentLevel) {
  console.log(gamePattern);

  console.log(userClickpattern);

  if (gamePattern[currentLevel] === userClickpattern[currentLevel]) {
    console.log('ok');

    if (gamePattern.length === userClickpattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');

    setTimeout(() => $('body').removeClass('game-over'), 200);

    started = false;

    $(document).keypress(function (e) {
      if (!started) {
        $('#level-title').text(`Level ${level}`);
        started = true;
      }
    });
    startOver();
    $('#level-title').text(`Game Over, Press Any Key to Restart`);

    console.log('not ok');
  }
  // if(currentLevel !== this.target.id )
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};

const playSound = function (name) {
  // document.addEventListener('click', function () {
  new Audio(`sounds/${name}.mp3`).play();
  // });
};

const animatePress = function (currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
};
