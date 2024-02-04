// Michelle Miranda - 22112023

const easyWordList = [
  { word: "robot", hint: "Autonomous machine designed to perform tasks" },
  { word: "globe", hint: "Spherical model of Earth" },
  { word: "camera", hint: "Device for capturing still or moving images" },
  { word: "dinosaur", hint: "Extinct reptile from prehistoric times" },
  { word: "astronaut", hint: "Person trained to travel in space" },
  { word: "cactus", hint: "Spiky desert plant" },
  { word: "jazz", hint: "Musical genre with improvisation and syncopation" },
  { word: "magnet", hint: "Object that attracts materials containing iron" },
  { word: "tornado", hint: "Violently rotating column of air" },
  { word: "telescope", hint: "Optical instrument for viewing distant objects" },
];

const hardList = [
  { word: "nanotechnology", hint: "Manipulation of matter at the molecular or atomic level" },
  { word: "bioluminescence", hint: "Production and emission of light by living organisms" },
  { word: "quasar", hint: "Highly energetic and distant celestial object" },
  { word: "hologram", hint: "Three-dimensional image produced by laser light" },
  { word: "cryptocurrency", hint: "Digital or virtual currency that uses cryptography for security" },
  { word: "biodiversity", hint: "Variety of life in a particular habitat or ecosystem" },
  { word: "nebula", hint: "Interstellar cloud of dust, hydrogen, helium, and other gases" },
  { word: "paradox", hint: "Seemingly contradictory statement or situation" },
  { word: "serendipity", hint: "Finding something good without actually looking for it" },
  { word: "kaleidoscope", hint: "Optical instrument with changing patterns" },
];

let selectedWord;
let guessedlist = [];
let wrongLetters = [];
let remainingGuesses = 3;

function selectMode(mode) {
    let words;
    
    if (mode === 'easy') {
        words = easyWordList;
    } else if (mode === 'hard') {
        words = hardList;
    } else {
        alert("Invalid mode selection");
        return;
    }

    document.getElementById("main-container").style.display = "none";
    document.getElementById("game").style.display = "grid";

    // Get a random word from the selected list
    let randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];
    

    // Initialize guessed letters and display
    guessedlist = [];
    wrongLetters = [];
    remainingGuesses = 3; // Reset remaining guesses
    let displayWord = "";
    for (let i = 0; i < selectedWord.word.length; i++) {
        displayWord += "_ ";
    }
    document.getElementById("displayWord").textContent = displayWord;

    // Clear the hint, wrong letters, and remaining guesses display
    document.getElementById("wrongLetters").textContent = "";
    document.getElementById("remainingGuesses").textContent = "Remaining Guesses: " + remainingGuesses;

    document.getElementById('play-again').addEventListener('click', playAgain);
}

function displayHint() {
    // Display the hint for the selected word
    if (selectedWord.word) {
        console.log(selectedWord.hint)
        alert("Hint: " + selectedWord.hint);
    } else {
        alert("Please select a mode first");
    }
}

function guessLetter() {
    let inputElement = document.getElementById("letter-input");

    // To check empty input
    if (!inputElement.value) {
        alert("Empty Input box. Please add input letter");
        return;
    }

    let letter = inputElement.value.toLowerCase();

    // Clear the input field
    inputElement.value = "";

    // Check if the game is already won or lost
    if (guessedlist.length === selectedWord.word.length || remainingGuesses === 0) {
        alert("The game is already over. Please start a new game.");
        return;
    }

    // Check if the letter has already been guessed
    if (guessedlist.includes(letter) || wrongLetters.includes(letter)) {
        alert("You have already guessed that letter!");
        return;
    }

    // Add the letter to the guessed letters array
    if (selectedWord.word.includes(letter)) {
        guessedlist.push(letter);
    } else {
        wrongLetters.push(letter);
        document.getElementById("wrongLetters").textContent = "Wrong Letters: " + wrongLetters.join(", ");
        remainingGuesses--;
        document.getElementById("remainingGuesses").textContent = "Remaining Guesses: " + remainingGuesses;
    }

    // Update the word display based on the guessed letters
    let updatedDisplay = "";
    let allLettersGuessed = true;
    for (let i = 0; i < selectedWord.word.length; i++) {
        if (guessedlist.includes(selectedWord.word[i])) {
            updatedDisplay += selectedWord.word[i] + " ";
        } else {
            updatedDisplay += "_ ";
            allLettersGuessed = false;
        }
    }
    document.getElementById("displayWord").textContent = updatedDisplay;

     // Check if all letters have been guessed
    if (allLettersGuessed) {
        document.getElementById('game').style.display = 'none';
        document.getElementById('win-screen').style.display = 'grid';
        document.getElementById('win-message').textContent = "Congratulations! You guessed the word correctly!";
    } else if (remainingGuesses === 0) {
        document.getElementById('game').style.display = 'none';
        document.getElementById('win-screen').style.display = 'grid';
        document.getElementById('win-message').textContent = "Sorry, you've run out of guesses. The correct word was: " + selectedWord.word;
    }

    // Add a listener to the "Play Again" button
    document.getElementById('play-again').addEventListener('click', playAgain);
}

function resetGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('main-container').style.display = 'grid';
}

// Add this function to your script.js
function playAgain() {
    resetGame();
}



