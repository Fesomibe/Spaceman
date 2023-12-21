/*----- constants -----*/
const SPRITE_WIDTH = 162;
const MAX_ATTEMPTS = 6;
const WORDS = ['SPACE', 'PLANET', 'MANNER', 'MOON', 'JUPITER', 'STAR', 'PLUTO', 'URANUS', 'SCHOOL', 'FRANK', 'UNIVERSE', 'CENTURY', 'EARTH'];
const MSG_LOOKUP = {
  'W': 'You got it!👏🏻 Good Job!',
  'L': 'Oh No!😱 Try Again!',
}

/*----- state variables -----*/
let secretWord;
let guessedWord;
let incorrectGuesses; // array to hold incorrect letters
let winner;

/*----- cached elements  -----*/
const guessEl = document.querySelector('footer');
const spacemanEl = document.getElementById('spaceman');
const msgEl = document.getElementById('msg');
const letterBtns = document.querySelectorAll('#container > button');
const playBtn = document.getElementById('playbtn');

/*----- event listeners -----*/
document.getElementById('container').addEventListener('click', handleGuess);
playBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[rndIdx];
  guessedWord = '_'.repeat(secretWord.length);
  incorrectGuesses = [];
  winner = null;
  render();
}

// In response to user interaction, update all impacted state, then call render
function handleGuess(evt) {
  const letter = evt.target.innerText;
  // guards
  if (letter.length !== 1 || winner) return;
  if (secretWord.includes(letter)) {
    // Correct guess - update guessWord
    let newGuess = '';
    for (let i = 0; i < secretWord.length; i++) {
      newGuess += secretWord.charAt(i) === letter ? letter : guessedWord.charAt(i);
    }
    guessedWord = newGuess;
  } else {
    // Incorrect guess - update incorrectGuesses
    incorrectGuesses.push(letter);
  }
  getWinner();
  render();
}

function getWinner() {
  if (guessedWord === secretWord) {
    winner = 'W';
  } else if (incorrectGuesses.length === MAX_ATTEMPTS) {
    winner = 'L';
  } else {
    winner = null;
  }
}

function renderMessage() {
  if (winner) {
    msgEl.innerHTML = MSG_LOOKUP[winner];
  } else {
    msgEl.innerHTML = `You have ${MAX_ATTEMPTS - incorrectGuesses.length} guesses remaining`;
  }
}

function render() {
  guessEl.innerText = guessedWord;
  spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
  playBtn.style.visibility = winner ? 'visible' : 'hidden';
  renderMessage();
  renderLetterBtns();
}

function renderLetterBtns() {
  letterBtns.forEach(function (btn) {
    const letter = btn.textContent;
    if (guessedWord.includes(letter) || incorrectGuesses.includes(letter)) {
      btn.style.visibility = 'hidden';
    } else {
      btn.style.visibility = 'visible';
    }
  });
}

// let play = document.getElementById("startbtn");
// function playMusic() {
//   let audio = new Audio("imgs/spaceSound.mp3");
//   // background sound length: 3s;
//   audio.play()
// }
// play.addEventListener("click", playMusic);