var programming_Languages = [
    "pithon",
    "javascript",
    "html",
    "css",
    "java",
    "json",
    "cofeescript",
]


let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null

function randomWord() {
    answer = programming_Languages[Math.floor(Math.random() * programming_Languages.length)];

}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `  
      <button
        class="letterButons"
        id='`+ letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter +`
      </button>
    `).join('');

   document.getElementById('keyboard').innerHTML = buttonsHTML; 
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null
    document.getElementById(chosenLetter).setAttribute('disabled',true);
    
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    }else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost() 
      updateHangManImg();
    }
}

function updateHangManImg() {
  document.getElementById('HangManImg').src = '/Images/' + mistakes + '.jpg';
}

function checkIfGameWon() { 
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = alert('You Won');
  }
}

function checkIfGameLost() { 
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The Asnswer was ' + answer;
    document.getElementById('keyboard').innerHTML = alert('You Lost');
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes(){
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = []
  document.getElementById('HangManImg').src = './images/0.jpg'

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();



