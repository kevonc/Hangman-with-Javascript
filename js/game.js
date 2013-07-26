var word = {
  secretWord: "",
  correctLetters: [],
  wrongLetters: [],
  answer: "",
  wordList: ['ruby', 'rails', 'javascript', 'array', 'hash', 'underscore', 'sinatra', 'model',
             'controller', 'view', 'devise', 'authentication', 'capybara', 'jasmine', 'cache',
             'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon',
             'development', 'data', 'design', 'inheritance', 'prototype', 'gist', 'github', 'agile',
             'fizzbuzz', 'route', 'gem', 'deployment', 'database'],

  // Selects a random word from the word list sets the secret word
  setSecretWord: function(){
    this.secretWord = _.shuffle(this.wordList)[0];
    for ( var i = 0; i < this.secretWord.length; i++ ) {
      this.answer += ("_");
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
  },

  findAnswer: function(guessedLetter) {
    for ( var i = 0; i < this.secretWord.length; i++ ) {
      if (_.isEqual(this.secretWord[i], guessedLetter)) {
        var answerArray = this.answer.split("");
        answerArray[i] = guessedLetter;
        this.answer = answerArray.join("");
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

  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){

  },

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  updateDisplay: function(secretWordWithBlanks, guessedLetters, guessesLeft){

  }
};

window.onload = function(){
  word.setSecretWord();
  console.log(word.secretWord);
  player.makeGuess("a");
  player.makeGuess("e");
  console.log(word.correctLetters);
  console.log(word.wrongLetters);
  console.log(word.answer);
  // Start a new game
  // Add event listener to the letter input field to grab letters that are guessed
  // Add event listener to the reset button to reset the game when clicked
  // Add event listener to the give up button to give up when clicked
};