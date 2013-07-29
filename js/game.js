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
    this.revealSecretWord = "";
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
      messageBox.innerHTML = "Please enter a letter from A to Z.";
    } else {
      if (_.contains(this.allLetters, guessedLetter)) {
        messageBox.innerHTML = "You've guessed this letter already.";
      } else {
        if (_.contains(this.secretWord, guessedLetter)) {
          this.correctLetters.push(guessedLetter);
        } else {
          this.wrongLetters.push(guessedLetter);
          game.hangTheMan();
        }
        this.allLetters.push(guessedLetter);
        messageBox.innerHTML = "";
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
    if (word.wrongLetters.length < this.maxGuesses) {
      word.checkLetters(guessedLetter);
    }
    word.findAnswer(guessedLetter);
    game.updateDisplay();
    player.checkWin();
    player.checkLose();
  },

  // Check if the player has won and end the game if so
  checkWin: function(){
    if (_.isEqual(word.secretWord, word.revealSecretWord)) {
      messageBox.innerHTML = "You're a champion! Keep going!";
      game.giveUp();
    }
  },

  // Check if the player has lost and end the game if so --- lose if more than 8 wrongLetters;
  checkLose: function(){
    if (word.wrongLetters.length === this.maxGuesses) {
      messageBox.innerHTML = "Game over. It's okay, try a new game!";
      game.giveUp();
    }
  }
};

var game = {
  hangTheMan: function() {
    switch(word.wrongLetters.length)
    {
      case 1:
      hangman.firstDeath();
      break;
      case 2:
      hangman.secondDeath();
      break;
      case 3:
      hangman.thirdDeath();
      break;
      case 4:
      hangman.fourthDeath();
      break;
      case 5:
      hangman.fifthDeath();
      break;
      case 6:
      hangman.sixthDeath();
      break;
      case 7:
      hangman.seventhDeath();
      break;
      case 8:
      hangman.eighthDeath();
      break;
    }
  },

  resetGame: function() {
    document.getElementById("guessField").style.display = 'block';
    restartButton.style.display = 'none';
    messageBox.innerHTML = "";
    word.allLetters = [];
    word.correctLetters = [];
    word.wrongLetters = [];
    word.hintLetter = "";
    word.setSecretWord();
    game.updateDisplay();
    canvas.remove();
    document.getElementById("letterField").value = "";
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){
    document.getElementById("revealAnswer").innerHTML = word.secretWord;
    document.getElementById("guessField").style.display = 'none';
    restartButton.style.display = 'block';
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

var canvas, line1, line2, line3, line4, line5, line6, line7a, line7b, line8a, line8b;
var hangman = {
  firstDeath: function() {
    canvas = new Raphael(document.getElementById('hangmanCanvas'), 350, 340);
    line1 = canvas.path("M 5 300 l 100 0 z" );
    line1.attr({'stroke-linejoin': "round", 'stroke-width': 7, 'stroke': '#545141'});
  },
  secondDeath: function() {
    line2 = canvas.path("M 55 50 l 0 250 z");
    line2.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
  },
  thirdDeath: function() {
    line3 = canvas.path("M 55 50 l 180 0 z");
    line3.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
  },
  fourthDeath: function() {
    line4 = canvas.path("M 235 50 l 0 30 z");
    line4.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
  },
  fifthDeath: function() {
    line5 = canvas.circle(235, 105, 25);
    line5.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
  },
  sixthDeath: function() {
    line6 = canvas.path("M 235 130 l 0 70 z");
    line6.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
  },
  seventhDeath: function() {
    line7a = canvas.path("M235 150,80L190, 180");
    line7b = canvas.path("M235 150,80L280, 180");
    line7a.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
    line7b.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#545141'});
  },
  eighthDeath: function() {
    line8a = canvas.path("M235 200,80L190, 270");
    line8b = canvas.path("M235 200,80L280, 270");
    line8a.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#e83642'});
    line8b.attr({'stroke-linejoin': "round", 'stroke-width': 7, stroke: '#e83642'});

    // Signal game lost
    line1.attr({stroke: '#e83642'});
    line2.attr({stroke: '#e83642'});
    line3.attr({stroke: '#e83642'});
    line4.attr({stroke: '#e83642'});
    line5.attr({stroke: '#e83642'});
    line6.attr({stroke: '#e83642'});
    line7a.attr({stroke: '#e83642'});
    line7b.attr({stroke: '#e83642'});
  }
};

function getChar(event) {
  return String.fromCharCode(event.keyCode || event.charCode);
}

var restartButton, resetButton, giveUpButton, guessButton, hintButton, messageBox;
window.onload = function(){

  // Buttons
  restartButton = document.getElementById("restartButton");
  resetButton = document.getElementById("resetButton");
  giveUpButton = document.getElementById("giveUpButton");
  // inputLetter = document.getElementById("letterField").value; // this is not working!!! i dont know why!!!
  guessButton = document.getElementById("guessButton");
  hintButton = document.getElementById("hintButton");
  messageBox = document.getElementById("messageBox");

  // Start a new game
  word.setSecretWord();
  restartButton.style.display = 'none';

  // Keypress event
  document.getElementById("letterField").onkeypress = function(event) {
    var char = getChar(event || window.event);
    this.value = char;
    player.makeGuess(char);
    return false;
  };

  var resetHintButton = function() {
    hintButton.removeAttribute('disabled');
    hintButton.style.backgroundColor = "#4c8f4d";
    hintButton.style.color = "#fff";
  };

  // Restart Game
  // restartButton.addEventListener("click", function () { game.restartGame(); });
  restartButton.onclick = function () {
    game.resetGame();
    resetHintButton();
   };
  // Add event listener to the reset button to reset the game when clicked
  resetButton.onclick = function () {
    game.resetGame();
    resetHintButton();
  };
  // Add event listener to the give up button to give up when clicked
  giveUpButton.onclick = function () { game.giveUp(); };
  // Hint button
  hintButton.onclick = function () {
    game.provideHint();
    hintButton.setAttribute('disabled', 'disabled');
    hintButton.style.backgroundColor = "#9fcf88";
    hintButton.style.color = "#fff";
  };
};