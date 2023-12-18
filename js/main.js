/*----- constants -----*/
const MAX_ATTEMPTS = 7;
const WORDS = ['SPACE', 'PLANET', 'MAN'];

/*----- state variables -----*/
let secret_word;
let guessed_word;
let incorrect_guesses; // array to hold incorrect letters

/*----- cached elements  -----*/



/*----- event listeners -----*/

/*----- functions -----*/
init();

function init() {
  const rndIdx = Math.floor(Math.random() * WORDS.length);
  secret_word = WORDS[rndIdx];
  guessed_word = '_'.repeat(secret_word.length);
  incorrect_guesses = [];
  render();
}

function render () {

}