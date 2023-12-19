/*----- constants -----*/
const SPRITE_WIDTH = 504;
const MAX_ATTEMPTS = 7;
const WORDS = ['SPACE', 'PLANET', 'MAN'];

/*----- state variables -----*/
let secretWord;
let guessedWord;
let incorrectGuesses; // array to hold incorrect letters

/*----- cached elements  -----*/
const guessEl = document.querySelector('footer');
const spacemanEl = document.getElementById('spaceman');

/*----- event listeners -----*/

/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[rndIdx];
  guessedWord = '_'.repeat(secretWord.length);
  incorrectGuesses = [];

  render();
}

function render () {
    guessEl.innerText = guessedWord;
    spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
}