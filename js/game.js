var word = {
  secretWord: "",
  allLetters: [],
  correctLetters: [],
  wrongLetters: [],
  revealSecretWord: "",
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
  },

  // Takes an array of letters as input and returns an array of two items:
  // 1) A string with the parts of the secret word that have been guessed correctly and underscore for the parts that haven't
  // 2) An array of all the guessed letters that were not in the secret word

  checkLetters: function(guessedLetter){
    if (_.contains(this.secretWord, guessedLetter)) {
      this.correctLetters.push(guessedLetter);
    } else {
      this.wrongLetters.push(guessedLetter);
    }
    this.allLetters.push(guessedLetter);
  },

  findAnswer: function(guessedLetter) {
    for ( var i = 0; i < this.secretWord.length; i++ ) {
      if (_.isEqual(this.secretWord[i], guessedLetter)) {
        var revealSecretWordArray = this.revealSecretWord.split("");
        revealSecretWordArray[i] = guessedLetter;
        this.revealSecretWord = revealSecretWordArray.join("");
      }
    }
  }
};

var player = {
  maxGuesses: 8,

  // Takes a new letter as input and updates the game
  makeGuess: function(guessedLetter){
    word.checkLetters(guessedLetter);
    word.findAnswer(guessedLetter);
    game.updateDisplay(); // (?)
  },

  // Check if the player has won and end the game if so
  checkWin: function(wordString){
    return _.isEqual(secretWord, wordString);
  },

  // Check if the player has lost and end the game if so --- lose if more than 8 wrongLetters;
  checkLose: function(wrongLetters){
    return wrongLetters.length > maxGuesses;
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
    game.updateDisplay();
    document.getElementById("revealAnswer").innerHTML = "";
    word.setSecretWord();
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){
    document.getElementById("revealAnswer").innerHTML = word.secretWord;
  },

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  // secretWordWithBlanks, guessedLetters, guessesLeft
  updateDisplay: function(){
    document.getElementById("revealAnswer").innerHTML = "Answer: " + word.revealSecretWord;
    document.getElementById("guessedLetters").innerHTML = word.allLetters;
    document.getElementById("guessesLeft").innerHTML = player.maxGuesses - word.wrongLetters.length;
  }
};

window.onload = function(){

// Buttons
var resetButton = document.getElementById("resetButton");
var giveUpButton = document.getElementById("giveUpButton");
var inputLetter = document.getElementById("letterField").value;
var guessButton = document.getElementById("guessButton");

  // Start a new game
  word.setSecretWord();
  console.log(word.secretWord);
  player.makeGuess("a");
  player.makeGuess("e");
  console.log(word.correctLetters);
  console.log(word.wrongLetters);
  console.log(word.revealSecretWord);
  game.updateDisplay();
  // game.resetGame();
  console.log(word.secretWord);
  console.log(inputLetter);
  // Add event listener to the letter input field to grab letters that are guessed
  guessButton.addEventListener("click", function () { player.makeGuess(inputLetter); });
  // Add event listener to the reset button to reset the game when clicked
  resetButton.addEventListener("click", function () { game.resetGame(); });
  // Add event listener to the give up button to give up when clicked
  giveUpButton.addEventListener("click", function () { game.giveUp(); });
};