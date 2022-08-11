'use strict';

const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

const s0 = document.querySelector('#score--0');
const s1 = document.querySelector('#score--1');

const p0 = document.querySelector('.player--0');
const p1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');

let current = 0;
let player = 0;
let score0 = 0;
let score1 = 0;

//display current points
const displayCurr = function () {
  const activePlayer = `current--${player}`;
  document.querySelector(`#${activePlayer}`).textContent = current;
};

//Shift Player's Turn
const changeTurn = function () {
  if (player == 0) {
    p0.classList.remove('player--active');
    p1.classList.add('player--active');
  } else {
    p1.classList.remove('player--active');
    p0.classList.add('player--active');
  }
  player = player == 0 ? 1 : 0;
};

//display Score
const displayScore = function () {
  s0.textContent = score0;
  s1.textContent = score1;
};

//display Winner
const displayWinner = function (ply) {
  if (ply == 0) {
    p0.classList.add('player--winner');
  } else {
    p1.classList.add('player--winner');
  }
  roll.disabled = true;
  hold.disabled = true;
};

//Dice is rolled
roll.addEventListener('click', function () {
  const number = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${number}.png`;
  dice.style.display = 'block';
  if (number == 1) {
    current = 0;
    displayCurr();
    changeTurn();
  } else {
    current += number;
    displayCurr();
  }
});

//Hold is clicked
hold.addEventListener('click', function () {
  if (player == 0) {
    score0 += current;
    if (score0 >= 100) {
      displayWinner(player);
    }
  } else {
    score1 += current;
    if (score1 >= 100) {
      displayWinner(player);
    }
  }
  displayScore();
  current = 0;
  changeTurn();
});

//New Game is selected
newGame.addEventListener('click', function () {
  roll.disabled = false;
  hold.disabled = false;
  score0 = score1 = 0;
  player = 0;
  current = 0;
  displayScore();
  p0.classList.remove('player--winner');
  p1.classList.remove('player--winner');
  p0.classList.add('player--active');
  p1.classList.remove('player--active');
  document.querySelector('#current--0').textContent = current;
  document.querySelector('#current--1').textContent = current;
  dice.style.display = 'none';
});
