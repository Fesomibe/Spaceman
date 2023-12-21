/*----- constants -----*/
const SPRITE_WIDTH = 162;
const MAX_ATTEMPTS = 6;
const WORDS = ['SPACE', 'PLANET', 'MANNER', 'MOON', 'JUPITER', 'STAR', 'PLUTO', 'URANUS', 'SCHOOL', 'FRANK','UNIVERSE', 'CENTURY', 'EARTH'];
const MSG_LOOKUP = {
  null: '',
  'W': 'You got it!👏🏻 Good Job!',
  'L': 'Oh No!😱 Try Again!',
}

/*----- state variables -----*/
let secretWord;
let guessedWord;
let incorrectGuesses; // array to hold incorrect letters
let winner;
let remainingAttempts;

/*----- cached elements  -----*/
const guessEl = document.querySelector('footer');
const spacemanEl = document.getElementById('spaceman');
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.getElementById('container').addEventListener('click', handleGuess);
document.getElementById('playbtn').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secretWord = WORDS[rndIdx];
  guessedWord = '_'.repeat(secretWord.length);
  incorrectGuesses = [];
  remainingAttempts = parseInt(MAX_ATTEMPTS);
  winner = null;
  render();
}

// In response to user interaction, update all impacted state, then call render
function handleGuess(evt) {
    const letter = evt.target.innerText;
    // guards
    if (letter.length !== 1) return;
    if (secretWord.includes(letter)) {

function updateMessage(message) {
    if (msgEl) {
      msgEl.textContent = message;
}
  }
      
// Correct guess - update guessWord
      let newGuess = '';
      for (let i = 0; i < secretWord.length; i++) {
        newGuess += secretWord.charAt(i) === letter ? letter : guessedWord.charAt(i);
      }
      guessedWord = newGuess;
    } else {

// Incorrect guess - update incorrectGuesses
      incorrectGuesses.push(letter);
      remainingAttempts--;
    }
  getWinner();
  render();
}

function getWinner() {
  if (guessedWord === secretWord) {
    winner = 'W';
  } else if(guessedWord !== secretWord && remainingAttempts > 0) {
    winner = null;
  } else {
    winner = 'L';
  }
}

function renderMessage() {
  msgEl.innerHTML = MSG_LOOKUP[winner];
  msgEl.style.visibility = winner === null ? 'hidden' : 'visible';
}

function render() {
    guessEl.innerText = guessedWord;
    spacemanEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - incorrectGuesses.length)}px`;
    renderMessage();
}

let play = document.getElementById("startbtn");
    function playMusic() {
      let audio = new Audio("imgs/spaceSound.mp3");
      // background sound length: 3s;
      audio.play()
    }
    play.addEventListener("click", playMusic);