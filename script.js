const config = [
  {
    word: "LOQUENDO",
    imageFolder: "images/haster",
    maxErrors: 9
  },
  {
    word: "CASA",
    imageFolder: "images/casa",
    maxErrors: 4
  }
];

let current = {};
let usedLetters = [];
let errors = 0;

function setupGame() {
  const random = config[Math.floor(Math.random() * config.length)];
  current = {
    ...random,
    guessed: [],
    revealedImages: 0
  };
  usedLetters = [];
  errors = 0;

  drawWord();
  drawKeyboard();
  drawImage();
}

function drawWord() {
  const display = document.getElementById("wordDisplay");
  display.textContent = current.word.split("").map(letter => (
    current.guessed.includes(letter) ? letter : "_"
  )).join(" ");
}

function drawKeyboard() {
  const container = document.getElementById("keyboard");
  container.innerHTML = "";
  const abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  for (let c of abc) {
    const button = document.createElement("button");
    button.textContent = c;
    button.disabled = usedLetters.includes(c);
    button.onclick = () => guessLetter(c);
    container.appendChild(button);
  }
}

function drawImage() {
  const container = document.getElementById("imageContainer");
  container.innerHTML = "";
  for (let i = 1; i <= current.revealedImages; i++) {
    const img = document.createElement("img");
    img.src = `${current.imageFolder}/${i}.png`;
    container.appendChild(img);
  }
}

function guessLetter(letter) {
  usedLetters.push(letter);
  if (current.word.includes(letter)) {
    current.guessed.push(letter);
  } else {
    errors++;
    current.revealedImages = errors;
  }

  drawKeyboard();
  drawWord();
  drawImage();
  checkGameOver();
}

function checkGameOver() {
  if (errors >= current.maxErrors) {
    alert(`¡Perdiste! La palabra era: ${current.word}`);
    nextWord();
  } else if (current.word.split("").every(l => current.guessed.includes(l))) {
    alert("🎉 ¡Ganaste!");
    nextWord();
  }
}

function nextWord() {
  setupGame();
}

window.onload = setupGame;
