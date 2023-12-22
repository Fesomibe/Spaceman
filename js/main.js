/*----- constants -----*/
const SPRITE_WIDTH = 162;
const MAX_ATTEMPTS = 6;
const WORDS = ['SPACE', 'PLANET', 'MANNER', 'MOON', 'JUPITER', 'STAR', 'PLUTO', 'URANUS', 'SCHOOL', 'FRANK', 'UNIVERSE', 'CENTURY', 'EARTH'];
const SOUNDS = {
  correct: 'audio/correct.mp3',
  wrong: 'audio/wrong.mp3',
  win: 'audio/win.mp3',
  lose: 'audio/lose.mp3',
};
const MSG_LOOKUP = {
  'W': 'You got it!👏🏻 Good Job!',
  'L': 'Oh No!😱 Try Again!',
};

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
const player = new Audio();

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
    playSound('correct');
  } else {
    // Incorrect guess - update incorrectGuesses
    incorrectGuesses.push(letter);
    playSound('wrong');
  }
  getWinner();
  render();
}

function getWinner() {
  if (guessedWord === secretWord) {
    winner = 'W';
    setTimeout(function() {
      playSound('win');
    }, 500);
  } else if (incorrectGuesses.length === MAX_ATTEMPTS) {
    winner = 'L';
    setTimeout(function() {
      playSound('lose');
    }, 500);
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

function playSound(sound) {
  player.src = SOUNDS[sound];
  player.play();
}