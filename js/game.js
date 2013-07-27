var word = {
  secretWord: "",
  allLetters: [],
  correctLetters: [],
  wrongLetters: [],
  revealSecretWord: "",
  hintLetter: "",
  wordList: ['ruby', 'rails', 'javascript', 'array', 'hash', 'underscore', 'sinatra', 'model',
             'controller', 'view', 'devise', 'authentication', 'capybara', 'jasmine', 'cache',
             'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon',
             'development', 'data', 'design', 'inheritance', 'prototype', 'gist', 'github', 'agile',
             'fizzbuzz', 'route', 'gem', 'deployment', 'database'],

  // Selects a random word from the word list sets the secret word
  setSecretWord: function(){
    this.secretWord = _.shuffle(this.wordList)[0];
    for ( var i = 0; i < this.secretWord.length; i++ ) {
      this.revealSecretWord += ("_");
    }
    document.getElementById("revealAnswer").innerHTML = word.revealSecretWord;
  },

  // Takes an array of letters as input and returns an array of two items:
  // 1) A string with the parts of the secret word that have been guessed correctly and underscore for the parts that haven't
  // 2) An array of all the guessed letters that were not in the secret word

  checkLetters: function(guessedLetter){
    var singleCharTest = /^[a-z]$/;
    if (guessedLetter.search(singleCharTest) == -1) {
      document.getElementById("messageBox").innerHTML = "Please enter a letter from A to Z.";
    } else {
      if (_.contains(this.allLetters, guessedLetter)) {
        document.getElementById("messageBox").innerHTML = "You've guessed this letter already.";
      } else {
        if (_.contains(this.secretWord, guessedLetter)) {
          this.correctLetters.push(guessedLetter);
        } else {
          this.wrongLetters.push(guessedLetter);
        }
        this.allLetters.push(guessedLetter);
        document.getElementById("messageBox").innerHTML = "";
      }
    }
  },

  findAnswer: function(guessedLetter) {
    for ( var i = 0; i < this.secretWord.length; i++ ) {
      if (_.isEqual(this.secretWord[i], guessedLetter)) {
        var revealSecretWordArray = this.revealSecretWord.split("");
        revealSecretWordArray[i] = guessedLetter;
        this.revealSecretWord = revealSecretWordArray.join("");
      }
    }
  },

  getHintLetter: function() {
    var correctLettersLeft = _.shuffle(_.difference(this.secretWord, this.correctLetters));
    this.hintLetter = _.first(correctLettersLeft);
  }
};

var player = {
  maxGuesses: 8,

  // Takes a new letter as input and updates the game
  makeGuess: function(guessedLetter){
    word.checkLetters(guessedLetter);
    word.findAnswer(guessedLetter);
    game.updateDisplay();
    player.checkWin();
    player.checkLose();
  },

  // Check if the player has won and end the game if so
  checkWin: function(){
    if (_.isEqual(word.secretWord, word.revealSecretWord)) {
      confirm("YOU WIN!");
      confirm("New Game!");
      game.resetGame();
    }
  },

  // Check if the player has lost and end the game if so --- lose if more than 8 wrongLetters;
  checkLose: function(){
    if (word.wrongLetters.length >= this.maxGuesses) {
      confirm("You Lose!");
      confirm("New Game!");
      game.resetGame();
    }
  }
};

var game = {
  // Resets the game
  resetGame: function(){
    // word.secretWord = "";
    word.allLetters = [];
    word.correctLetters = [];
    word.wrongLetters = [];
    word.revealSecretWord = "";
    word.hintLetter = "";
    game.updateDisplay();
    document.getElementById("revealAnswer").innerHTML = "";
    word.setSecretWord();
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){
    document.getElementById("revealAnswer").innerHTML = word.secretWord;
    // word.setSecretWord();  // how to have order of execution in js????????????????????????????????????
  },

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  // secretWordWithBlanks, guessedLetters, guessesLeft
  updateDisplay: function(){
    document.getElementById("revealAnswer").innerHTML = word.revealSecretWord;
    document.getElementById("guessedLetters").innerHTML = word.allLetters.join(" ");
    document.getElementById("guessesLeft").innerHTML = player.maxGuesses - word.wrongLetters.length;
  },

  provideHint: function() {
    word.getHintLetter();
    word.findAnswer(word.hintLetter);
    game.updateDisplay();
  }
};

function getChar(event) {
  return String.fromCharCode(event.keyCode || event.charCode);
}

window.onload = function(){

// Buttons
var resetButton, giveUpButton, inputLetter, guessButton;
resetButton = document.getElementById("resetButton");
giveUpButton = document.getElementById("giveUpButton");
// inputLetter = document.getElementById("letterField").value; // this is not working!!! i dont know why!!!
guessButton = document.getElementById("guessButton");
hintButton = document.getElementById("hintButton");

  // Start a new game
  word.setSecretWord();
  console.log(word.secretWord);
  // player.makeGuess("a");
  // player.makeGuess("e");
  // player.makeGuess("b");

  // console.log(word.correctLetters);
  // console.log(word.wrongLetters);
  // console.log(word.revealSecretWord);
  // game.updateDisplay();
  // game.resetGame();
  // console.log(word.secretWord);
  // console.log(inputLetter);
  // Add event listener to the letter input field to grab letters that are guessed
    // guessButton.addEventListener("click", function () {
    //   player.makeGuess(document.getElementById("letterField").value);
    // });
  // Keypress event
  document.getElementById("letterField").onkeypress = function(event) {
    var char = getChar(event || window.event);
    this.value = char;
    player.makeGuess(char);
    return false;
  }
  // Add event listener to the reset button to reset the game when clicked
  resetButton.addEventListener("click", function () { game.resetGame(); });
  // Add event listener to the give up button to give up when clicked
  giveUpButton.addEventListener("click", function () { game.giveUp(); });
  // Hint button
  hintButton.addEventListener("click", function () {
    game.provideHint();
    hintButton.disabled = true;
    hintButton.style.backgroundColor = "#9fcf88";
    hintButton.style.color = "#fff";
  });
};