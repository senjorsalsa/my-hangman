/* eftersom det bara är ett litet projekt till min sambo orkar jag inte dölja orden ^^ */
const hangmanWords = [
  "äpple",
  "banan",
  "boken",
  "bordet",
  "stolen",
  "skolan",
  "lärarens",
  "elever",
  "klassrum",
  "snöboll",
  "blomma",
  "trädgård",
  "floden",
  "stranden",
  "bergen",
  "dalgång",
  "sandig",
  "sjöarna",
  "flygplan",
  "kameran",
  "fiskar",
  "choklad",
  "kakan",
  "hamburgare",
  "pastan",
  "grönsak",
  "marmelad",
  "kläder",
  "jackan",
  "tröjor",
  "byxorna",
  "strumpor",
  "handskar",
  "halsduk",
  "paraply",
  "resorna",
  "jobbet",
  "semester",
  "flygplats",
  "motorcykel",
  "familjen",
  "vänskap",
  "kärleken",
  "historisk",
  "framtiden",
  "nutiden",
  "glädjen",
  "sorgen",
  "väderlek",
  "klockan",
  "morgonen",
  "kvällen",
  "veckorna",
  "decennier",
  "sekler",
  "arbete",
  "kollegor",
  "mötena",
  "betygen",
  "examen",
  "språken",
  "bokstäver",
  "nummer",
  "filmer",
  "musikens",
  "radioapparat",
  "strandkant",
  "vintertid",
  "sommarkväll",
  "höstmorgon",
  "trädstam",
  "skogsväg",
  "cykling",
  "parkerad",
  "blommor",
  "sjöutsikt",
  "solstrålar",
  "månsken",
  "stjärnklart",
  "fjärilar",
  "fågelsång",
  "skogsglänta",
  "strandnära",
  "bergstopp",
  "flodhäst",
  "fåglarna",
  "skidbacke",
  "skidåkning",
  "båtresa",
  "utflykten",
];

let buttons = document.querySelectorAll(".letterButton");

for (let button of buttons) {
  button.addEventListener("click", roundLogic);
}

const getRandomWord = () =>
  hangmanWords[Math.floor(Math.random() * hangmanWords.length)];

let remainingGuesses = 6;
let randomWord = getRandomWord().toUpperCase();
let theWord = "";

for (let i = 0; i < randomWord.length; i++) {
  theWord += "_";
}

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", newGame);
const correct = document.querySelector(".correct");
correct.classList.add("hidden");
correctSpan = document.querySelector("#cWord");
const image = document.querySelector("img");
const remaining = document.querySelector(".remaining span");
let guessingWordElement = document.querySelector(".word p");
guessingWordElement.innerText = theWord;

function roundLogic() {
  let letter = this.innerText;
  this.disabled = true;
  if (randomWord.includes(letter)) {
    let newWord = "";
    for (let i = 0; i < randomWord.length; i++) {
      if (theWord[i] === "_" && randomWord[i] === letter) {
        newWord += letter;
      } else if (theWord[i] === "_" && randomWord[i] !== letter) {
        newWord += "_";
      } else {
        newWord += theWord[i];
      }
    }
    theWord = newWord;
    guessingWordElement.innerText = newWord;
    if (!theWord.includes("_")) {
      /* Player won */
      correct.innerHTML = "<p>Congratulations! You won!</p>";
    }
  } else {
    remainingGuesses--;
    remaining.innerText = remainingGuesses;
    image.src = `img/stage${remainingGuesses}.jpg`;
    if (remainingGuesses === 0) {
      /* Player lost */
      toggleButtons(true);
      correctSpan.innerText = randomWord;
      correct.classList.add("revealed");
    }
  }
  
}

function newGame() {
  theWord = "";
  toggleButtons(false);
  randomWord = getRandomWord().toUpperCase();
  for (let i = 0; i < randomWord.length; i++) {
    theWord += "_";
  }
  guessingWordElement.innerText = theWord;
  remainingGuesses = 6;
  remaining.innerText = remainingGuesses;
  image.src = `img/stage6.jpg`;
  correct.style.display = "none";
}

function toggleButtons(action){
  for (let button of buttons) {
    button.disabled = action;
  }
}
